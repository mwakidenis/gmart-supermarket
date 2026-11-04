import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../actions/CartControl';
import { PDFDocument, rgb, StandardFonts,degrees } from 'pdf-lib';
import { formatKshFromInr } from '../utils/currency';

function Orders() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userID = user.uid;

                const response = await axios.get(`https://gmart-supermarket.vercel.app/allOrder/${userID}`, {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET',
                        'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept'
                    }
                });
                const ordersGot = response.data;
                setOrders(ordersGot);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    const generatePDFInvoice = async (order) => {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([600, 800]);
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        const watermarkImageUrl = '/logo.png'; 
        const watermarkImageResponse = await fetch(watermarkImageUrl);
        const watermarkImageArrayBuffer = await watermarkImageResponse.arrayBuffer();
        const watermarkImage = await pdfDoc.embedPng(watermarkImageArrayBuffer);
        const watermarkDims = watermarkImage.scale(2); // Adjust scale as needed

        const centerX = width / 2;
        const centerY = height / 2;
        const rotationAngle = -45;

        page.drawImage(watermarkImage, {
            x: centerX - (watermarkDims.width / 2),
            y: centerY + (watermarkDims.height / 2),
            width: watermarkDims.width,
            height: watermarkDims.height,
            opacity: 0.4,
            rotate: degrees(rotationAngle),
        });

        const drawText = (text, x, y, size = 12, fontToUse = font, color = rgb(0, 0, 0)) => {
            page.drawText(text, { x, y, size, font: fontToUse, color });
        };

        // Header
        drawText('Invoice', width / 2 - 30, height - 50, 24, boldFont);
        drawText(`Order ID: ${order._id}`, 50, height - 80, 10);
        drawText(`Date: ${new Date(order.date).toLocaleDateString()}`, 50, height - 95, 10);

        // Customer Details
        drawText('Customer Details', 50, height - 120, 14, boldFont);
        drawText(`Address: ${order.address}`, 50, height - 140, 10);
        drawText(`Postal Code: ${order.pinCode}`, 50, height - 155, 10);
        drawText(`Delivery Type: ${order.deliveryType}`, 50, height - 170, 10);

        // Items Table
        drawText('Items:', 50, height - 200, 14, boldFont);
        drawText('Product Name', 50, height - 220, 10, boldFont);
        drawText('Price', 300, height - 220, 10, boldFont);
        drawText('Quantity', 400, height - 220, 10, boldFont);
        drawText('Total', 500, height - 220, 10, boldFont);

        let yOffset = height - 240;
        let total = 0;
        order.order.forEach((item, index) => {
            drawText(item.productName, 50, yOffset, 10);
            drawText(formatKshFromInr(item.discountPrice), 300, yOffset, 10);
            drawText(item.count.toString(), 400, yOffset, 10);
            const total_item = parseFloat(item.discountPrice) * item.count;
            drawText(formatKshFromInr(total_item), 500, yOffset, 10);
            total += total_item;
            yOffset -= 20;
        });

        yOffset -= 20;
        drawText('Total:', 400, yOffset, 14, boldFont);
        drawText(formatKshFromInr(total), 500, yOffset, 14, boldFont);

        // Footer
        drawText('Thank you for your purchase!', width / 2 - 70, 50, 12, boldFont);

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `invoice_${order._id}.pdf`;
        link.click();
    };

    return (
        <>
            <div className='mt-[120px] flex justify-center'>
                <div className='container w-1/2 shadow-lg p-4'>
                    <h2 className="text-2xl font-bold mb-4">Orders</h2>
                    {orders.map((order, index) => (
                        <div key={index} className="mb-4 border border-gray-300 p-4 flex justify-between">
                            <div>
                                <ul>
                                    {order.order.map((item, itemIndex) => (
                                        <li key={itemIndex} className="mb-2">
                                            <span className="font-semibold">Product Name:</span> {item.productName}, 
                                            <span className="font-semibold"> Discount Price:</span> {formatKshFromInr(item.discountPrice)}, 
                                            <span className="font-semibold"> Count:</span> {item.count}
                                        </li>
                                    ))}
                                </ul>
                                
                                <h3 className="text-sm font-semibold mb-2">Order ID: {order._id}</h3>
                            </div>
                            <div className="flex flex-col space-y-2">
                                {order.orderStage < 4 && (
                                    <button 
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                        onClick={() => navigate(`/tracking/${order._id}`)}
                                    >
                                        Track
                                    </button>
                                )}
                                
                                <button 
                                    className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
                                    onClick={() => generatePDFInvoice(order)}
                                >
                                    Generate Invoice
                                </button>
                                
                                {(order.orderStage === 4 && order.feedback === "") && (
                                    <button 
                                        onClick={() => navigate(`/feedback/${order._id}`)}
                                        className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                    >
                                        Feedback
                                    </button>
                                )}

                                {(order.orderStage === 4 && order.feedback !== "") && (
                                    <h1 className='text-bold'>Order Complete</h1>
                                )}
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && <p>No orders found</p>}
                </div>
            </div>
        </>
    );
}

export default Orders;