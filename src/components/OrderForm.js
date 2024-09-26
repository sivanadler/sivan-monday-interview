import React, { useState } from 'react';
import { 
    TextField, 
    Flex, 
    Button, 
    AlertBanner, 
    AlertBannerText, 
    Checkbox 
} from 'monday-ui-react-core';
import axios from 'axios';
import FragranceTypeahead from './FragranceTypeahead';

const OrderForm = ({ fragrances, onOrderCreated }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [selectedFragrances, setSelectedFragrances] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [customInscriptionWanted, setCustomInscriptionWanted] = useState(false);
    const [customInscription, setCustomInscription] = useState('');

    const handleSubmit = async () => {
        const newOrder = {
            firstName,
            lastName,
            quantity,
            fragrances: selectedFragrances,
            customInscription
        };
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_ROOT_URL}/addOrder`, newOrder);
            console.log('Order added successfully:', response?.data);
            // Handle success message
            setSuccessMessage('Order created successfully!');
            setShowSuccess(true);
            setShowError(false);

            // Clear input fields
            setFirstName('');
            setLastName('');
            setQuantity(0);
            setSelectedFragrances([]);
            setCustomInscription('')
            setCustomInscriptionWanted(false)
        } catch (error) {
            console.error('Error adding order:', error);
            setErrorMessage('Failed to create order. Please try again.');
            setShowError(true);
            setShowSuccess(false);
        }
    };

    const handleCloseSuccess = () => setShowSuccess(false);
    const handleCloseError = () => setShowError(false);
    const handleChangeCustomInscriptionWanter = () => {
        //if custom inscription wanted checkbox is unclicked, clear out input
        if(customInscriptionWanted) setCustomInscription('')
        setCustomInscriptionWanted(!customInscriptionWanted)
        
    }

    let disabled = true;
    if (firstName !== '' && lastName !== '' && quantity !== 0 && selectedFragrances.length === 3){
        if(customInscriptionWanted && customInscription.length === 0) disabled = true;
        else disabled = false;
    }

    return (
        <div>
            {showSuccess && 
                <Flex direction={Flex.directions.COLUMN} gap={Flex.gaps.SMALL}>
                    <AlertBanner 
                        backgroundColor={AlertBanner.backgroundColors.POSITIVE} 
                        isCloseHidden={false}
                        onClose={handleCloseSuccess}
                    >
                        <AlertBannerText text={successMessage} />
                    </AlertBanner>
                </Flex>
            }
            {showError && 
                <Flex direction={Flex.directions.COLUMN} gap={Flex.gaps.SMALL}>
                    <AlertBanner 
                        backgroundColor={AlertBanner.backgroundColors.NEGATIVE} 
                        isCloseHidden={false}
                        onClose={handleCloseError}
                    >
                        <AlertBannerText text={errorMessage} />
                    </AlertBanner>
                </Flex>
            }
            <Flex direction={Flex.directions.COLUMN} gap={Flex.gaps.SMALL}>
                <Flex direction={Flex.directions.ROW} gap={Flex.gaps.LARGE} style={{ width: '50vw', margin: '2%' }}>
                    <TextField 
                        placeholder="First Name" 
                        title="First Name" 
                        value={firstName}
                        onChange={(e) => setFirstName(e)}
                        style={{ flex: 1 }}
                        required
                    />
                    <TextField 
                        placeholder="Last Name" 
                        title="Last Name" 
                        value={lastName}
                        onChange={(e) => setLastName(e)}
                        style={{ flex: 1 }}
                        required
                    />
                    <TextField 
                        placeholder="Quantity" 
                        title="Quantity"
                        type={TextField.types.NUMBER}
                        value={quantity}
                        onChange={(e) => setQuantity(e)}
                        style={{ flex: 1 }}
                        required
                    />
                </Flex>
                <Flex direction={Flex.directions.COLUMN} style={{ width: '100%' }}>
                    <FragranceTypeahead 
                        fragrances={fragrances}
                        selectedFragrances={selectedFragrances}
                        setSelectedFragrances={setSelectedFragrances}
                        extraStyles={{ padding: '10px 0' }} 
                    />
                </Flex>
                <Flex direction={Flex.directions.COLUMN} style={{ width: '100%' }}>
                <Checkbox
                    value={customInscriptionWanted}
                    checked={customInscriptionWanted}
                    onChange={handleChangeCustomInscriptionWanter}
                    label="Would you like to add a custom inscription?"
                />
                {
                    customInscriptionWanted 
                    && 
                    <TextField 
                        placeholder="Custom Inscription" 
                        title="Custom Inscription" 
                        value={customInscription}
                        onChange={(e) => setCustomInscription(e)}
                        style={{ flex: 1 }}
                        required
                    />
                }
                </Flex>
                <Flex direction={Flex.directions.ROW}>
                    <Flex direction={Flex.directions.COLUMN}>
                        <Button onClick={handleSubmit} disabled={disabled}>Start Order</Button>
                    </Flex>
                </Flex>
            </Flex>
        </div>
    );
};

export default OrderForm;
