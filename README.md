# Fragrance Order Application

This application allows users to create orders for fragrances with custom inscriptions. It consists of a frontend built with React and a backend API built with Node.js and Express. This was built cloning down the quickstart react template through the monday.com sdk. A custom board view application was built on top of this framework to meet all the necessary requirements of this proposal.

## Table of Contents

- [Introduction](#introduction)
- [Problem Definition](#problem-definition)
- [Goal](#goal)
- [Target Audience/Personas](#target-audiencepersonas)
- [Constraints](#constraints)
- [Solution Overview](#solution-overview)
- [Functional Requirements](#functional-requirements)
- [Non-functional Requirements](#non-functional-requirements)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Frontend](#running-the-frontend)
- [Running the API](#running-the-api)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Meeting Proposal Requirements](#meeting-proposal-requirements)
 - [How I Met the Requirements](#how-i-met-the-requirements)

## Introduction

monday.com has seen a massive surge in the corporate candle making gift market. The team wants to build a solution to serve this massive market that is currently underserved. With feedback from 10 different prospects, we aim to build a perfect solution to manage the order creation for custom candle orders.

## Problem Definition

- Too much manual labor to distribute work
- Massive lack of visibility for all stakeholders
- Orders are taken over the phone and recorded manually in spreadsheets
- Personalized inscriptions for candles to enhance customer experience

## Goal

- Improve the order placement experience
- Provide a platform for designers and manufacturers to have greater control and visibility of the production pipeline
- Move away from storing fragrances in a spreadsheet to a more secure centralized place

## Target Audience/Personas

- Candle Designer (Order Taker)
- Production Manager (Project Manager)

## Constraints

- No production constraints; production team can make as many orders as demanded
- Each box can only fit 3 candles
- No box can have more or less than 3 different scents
- No inventory in stock; all orders are produced in isolation

## Solution Overview

The solution involves creating an API with endpoints to manage fragrances and orders, and a frontend interface for order placement and management. Orders will be created on a predefined Monday.com board with custom inscriptions.

## Functional Requirements

### Must Have

- API endpoints to add, update, delete, and get all fragrances
- UI to select 3 fragrances per box and the quantity of kits in the order
- Creation of orders in the orders board

### Nice to Have

- Use Monday automations to streamline the process
- Use Vibe Design Kit for the UI if possible
- Calculate order SLA and report on performance using a dashboard

## Prerequisites

To run this code locally, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [Monday.com API Token](https://monday.com/developers/apps/getting-started)

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/fragrance-order-app.git
cd fragrance-order-app

npm install
```

To run the frontend, run 
```bash 
npm start
```
All of the api endpoints are written in the ```server.js``` file. To start the server, run 
```bash 
node server.js
```


## Environment Variables
### Frontend
- ```REACT_APP_API_ROOT_URL```: The root URL of your API (e.g., http://localhost:5000/api).

### API
- ```PORT```: The port on which the API server will run (default is 5000).
- ```MONDAY_API_TOKEN```: Your Monday.com API token.
- ```BOARD_ID```: The ID of your Monday.com board where orders will be created.


## Usage

Once both the frontend and API are running, you can access the application by navigating to http://localhost:3000 in your web browser. From there, you can create new fragrance orders, and they will be added to your Monday.com board.

## Meeting Proposal Requirements

- Orders are now placed via a web interface instead of over the phone, reducing manual entry and errors.
- API endpoints to manage fragrances (add, update, delete, get all) are implemented and tested in Postman.
- The UI allows selecting 3 fragrances per box and setting the quantity of kits in the order.
- Orders are created in the predefined Monday.com board with relevant details and custom inscriptions.
- Built automations in the Monday platform to move an order to its respective group when the status column is changed.
- Added a checkbox to ask the user creating an order if they want to add a custom inscription. If checked, they can add text which is displayed on the orders board on Monday.com. This was not included in the predefined image of the order form, but given the fact that the predefined Monday board had a column for custom inscriptions, it felt like a natural addition to the product.
- Structured files by building ```OrderForm``` and ```FragranceTypeahead``` components for a modular approach.
- Used the Vibe Design Kit for styling purposes to maintain consistency with Monday.com’s design principles.
- Added success and error messaging to the UI to ensure that the user knows if the order was placed successfully.