import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Input, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

const kenyaTowns = [
  { name: 'Nairobi', postalCode: '00100' },
  { name: 'Mombasa', postalCode: '80100' },
  { name: 'Kisumu', postalCode: '40100' },
  { name: 'Nakuru', postalCode: '20100' },
  { name: 'Eldoret', postalCode: '30100' },
  { name: 'Kiambu', postalCode: '00900' },
  { name: 'Meru', postalCode: '60200' },
  { name: 'Nyeri', postalCode: '10100' },
  { name: 'Chuka', postalCode: '60400' },
  { name: 'Embu', postalCode: '60100' },
  { name: 'Thika', postalCode: '01000' },
  { name: 'Nanyuki', postalCode: '10400' },
  { name: 'Machakos', postalCode: '90100' },
  { name: 'Kitale', postalCode: '30200' },
];

function SimpleDialog(props) {
  const { onClose, open } = props;
  const [pincode, setPincode] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [locationError, setLocationError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('userArea')) {
      localStorage.setItem('userArea', 'Nairobi');
    }
    if (!localStorage.getItem('userPincode')) {
      localStorage.setItem('userPincode', '00100');
    }
    setSuggestions(kenyaTowns);
  }, []);

  useEffect(() => {
    const getLocationAndPincode = async () => {
      const apiKey = import.meta.env.VITE_PINCODE_API_KEY;
      if (!apiKey) {
        return;
      }

      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            try {
              const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
              );

              const data = await response.json();
              const components = data?.results?.[0]?.components || {};
              const country = components.country || '';
              const locationPostalCode = components.postcode || '00100';
              const locationTown =
                components.city || components.town || components.county || 'Nairobi';

              if (country.toLowerCase() === 'kenya') {
                setPincode(locationPostalCode);
                localStorage.setItem('userPincode', locationPostalCode);
                localStorage.setItem('userArea', locationTown);
              }
            } catch (error) {
              setLocationError('Unable to auto-detect Kenya location. Enter postal code manually.');
            } finally {
              setLoading(false);
            }
          },
          () => {
            setLocationError('Location access denied. Please enter manually.');
            setLoading(false);
          }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser.');
      }
    };
    getLocationAndPincode();
  }, []);

  const handleClose = () => {
    if (pincode.length === 5 && localStorage.getItem('userArea')) {
      onClose();
    } else {
      alert('Please enter a valid Kenya postal code and select a town.');
    }
  };

  useEffect(() => {
    if (pincode.length === 0) {
      setSuggestions(kenyaTowns);
      return;
    }

    const matched = kenyaTowns.filter((town) =>
      town.postalCode.startsWith(pincode) ||
      town.name.toLowerCase().includes(pincode.toLowerCase())
    );
    setSuggestions(matched);
  }, [pincode]);

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setPincode(value);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          Enter your Kenya postal code
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center">
              <CircularProgress /> {/* Loading spinner */}
              <p className="ml-2">Fetching location...</p>
            </div>
          ) : (
            <>
              {locationError && <p>{locationError}</p>}
              <form
                action="/"
                onSubmit={(e) => {
                  e.preventDefault();

                  const matchedTown = kenyaTowns.find((town) => town.postalCode === pincode);
                  if (matchedTown) {
                    localStorage.setItem('userArea', matchedTown.name);
                  }

                  localStorage.setItem('userPincode', pincode || '00100');
                  if (!localStorage.getItem('userArea')) {
                    localStorage.setItem('userArea', 'Nairobi');
                  }

                  handleClose();
                }}
              >
                <Input
                  type="text"
                  placeholder="Enter Kenya postal code (e.g. 00100)"
                  value={pincode}
                  onChange={handleInputChange}
                  className="mb-3"
                />

                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </form>

              <div>
                <ul className="absolute z-50 p-1 bg-white w-10/12 shadow-lg">
                  {suggestions.map((suggestion) => (
                    <li key={suggestion.name}>
                      <button
                        onClick={(e) => {
                          localStorage.setItem('userArea', suggestion.name);
                          localStorage.setItem('userPincode', suggestion.postalCode);
                          setPincode(suggestion.postalCode);
                          setSuggestions([]);
                        }}
                      >
                        {suggestion.name} ({suggestion.postalCode})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
}

export default SimpleDialog;
