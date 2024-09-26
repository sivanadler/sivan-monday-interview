const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mondaySdk = require('monday-sdk-js');
require('dotenv').config();
const fragrances = require('./data'); 

////CONSTANTS////
const monday = mondaySdk();
const app = express();
const PORT = 3001;
const API_URL = 'https://api.monday.com/v2';
const API_TOKEN = process.env.API_TOKEN;
const BOARD_ID = process.env.BOARD_ID;

monday.setToken(API_TOKEN);

////MIDDLEWARE////
app.use(cors()); //
app.use(bodyParser.json());

////API ENDPOINTS////
// Endpoint to get all fragrances
app.get('/api/fragrances', (req, res) => {
  res.json(fragrances);
});

// Endpoint to add a new fragrance
app.post('/api/fragrances', (req, res) => {
  const newFragrance = { 
      id: String(fragrances.length + 1), // Simple ID generation
      ...req.body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
  };
  fragrances.push(newFragrance);
  res.status(201).json(newFragrance);
});

// Endpoint to update a fragrance
app.put('/api/fragrances/:id', (req, res) => {
  const { id } = req.params;
  const fragranceIndex = fragrances.findIndex(f => f.id === id);
  if (fragranceIndex === -1) {
      return res.status(404).json({ message: 'Fragrance not found' });
  }

  const updatedFragrance = {
      ...fragrances[fragranceIndex],
      ...req.body,
      updated_at: new Date().toISOString(),
  };

  fragrances[fragranceIndex] = updatedFragrance;
  res.json(updatedFragrance);
});

// Endpoint to delete a fragrance
app.delete('/api/fragrances/:id', (req, res) => {
  const { id } = req.params;
  const fragranceIndex = fragrances.findIndex(f => f.id === id);

  if (fragranceIndex === -1) {
      return res.status(404).json({ message: 'Fragrance not found' });
  }

  fragrances.splice(fragranceIndex, 1);
  res.status(204).send();
});


//Create or get tags
const createOrGetTag = async (tag) => {
  const query = `
    mutation {
      create_or_get_tag(
        board_id: ${BOARD_ID}, 
        tag_name: "${tag}",
      ) {
        id,
        name
      }
    }
  `;

  const response = await fetch("https://api.monday.com/v2", {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': API_TOKEN
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  if (data.errors) {
    throw new Error(`Error creating/retrieving tag: ${JSON.stringify(data.errors)}`);
  }
  return data.data.create_or_get_tag.id;
};


// Endpoint to add a new order
app.post('/api/addOrder', async (req, res) => {
  const { firstName, lastName, quantity, fragrances, customInscription } = req.body;

  try {
    // Create or get tag IDs for all fragrances
    const tagIds = await Promise.all(fragrances.map(fragrance => createOrGetTag(fragrance.value)));
    
    const tagValues = JSON.stringify({
      tags4: { tag_ids: tagIds }
    });

    // Construct the column values
    const columnValues = JSON.stringify({
      status: { label: "Received" },
      tags4__1: { tag_ids: tagIds },
      text__1: customInscription
    });
    
    // Create the item with the tag IDs
    const itemMutation = `
      mutation {
        create_item (
          board_id: ${BOARD_ID}, 
          group_id: "topics", 
          item_name: "${firstName} ${lastName}", 
          column_values: "${columnValues.replace(/"/g, '\\"')}",
        ) {
          id
          column_values {
            id
            text
          }
        }
      }
    `;

    const itemResponse = await fetch("https://api.monday.com/v2", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_TOKEN
      },
      body: JSON.stringify({ 
        query: itemMutation,
        variables : JSON.stringify({
          myBoardId: BOARD_ID,
          myColumnValues: tagValues.replace(/"/g, '\\"')
        })
      })
    });

    const itemData = await itemResponse.json();
    if (itemData.errors) {
      throw new Error(`Error creating item: ${JSON.stringify(itemData.errors)}`);
    }

    res.status(200).json({ message: 'Order added successfully', item: itemData.data.create_item });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to add order', details: error.message });
  }
});


//log to make sure server is running
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


