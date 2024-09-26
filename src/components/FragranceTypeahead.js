import React from 'react';
import { AlertBanner, AlertBannerText, Dropdown } from 'monday-ui-react-core';

const FragranceTypeahead = ({ fragrances, selectedFragrances, setSelectedFragrances }) => {

    let error = false

    // Convert fragrances data into the format needed for Vibe Dropdown
    const optionsList = fragrances?.map((fragrance) => ({
      id: fragrance.id,
      value: fragrance.name,
      label: fragrance.name
    }));

    const handleSelectOption = (value) => {
      if(selectedFragrances.length < 3){
        const updatedFragrances = [...selectedFragrances, value];
        setSelectedFragrances(updatedFragrances)
      }
    }
    
    const handleRemoveOption = (value) => {
      if(selectedFragrances.length <= 3){
        const updatedFragrances = selectedFragrances.filter(f => f.id !== value.id)
        setSelectedFragrances(updatedFragrances)
      }
    }

    if(selectedFragrances.length === 3) error = true

    return (
      <>
        {error && 
          <AlertBanner backgroundColor={AlertBanner.backgroundColors.WARNING} isCloseHidden>
            <AlertBannerText text="You can only add 3 scents to this order." />
          </AlertBanner>
        }
        <Dropdown
          options={optionsList}
          multi
          multiline
          closeMenuOnSelect={true}
          label='Select 3 Fragrances'
          placeholder="Select fragrances..."
          value={selectedFragrances}
          onOptionSelect={(e) => handleSelectOption(e)}
          onOptionRemove={(e) => handleRemoveOption(e)}
          searchable={selectedFragrances.length < 3 ? true : false}
          clearable
        />
      </>
     
    ); 
}

export default FragranceTypeahead