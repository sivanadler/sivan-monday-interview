import React, { useEffect, useState } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import { Flex } from 'monday-ui-react-core';
import axios from "axios";
import OrderForm from "./components/OrderForm";

// Usage of mondaySDK example, for more information visit here: https://developer.monday.com/apps/docs/introduction-to-the-sdk/
const monday = mondaySdk();

const App = () => {
    const [context, setContext] = useState();
    const [fragrances, setFragrances] = useState([]);

    useEffect(() => {
      // Notice this method notifies the monday platform that user gains a first value in an app.
      // Read more about it here: https://developer.monday.com/apps/docs/mondayexecute#value-created-for-user/
      monday.execute("valueCreatedForUser");

      // TODO: set up event listeners, Here`s an example, read more here: https://developer.monday.com/apps/docs/mondaylisten/
      monday.listen("context", (res) => {
        setContext(res.data);
      });
    }, []);

    useEffect(() => {
      const fetchFragrances = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_ROOT_URL}/fragrances`);
          setFragrances(response.data);
        } catch (error) {
          console.error('Error fetching fragrances:', error);
        }
      };

      fetchFragrances();
    }, []);

    return (
      <div className="App">
        <Flex 
          direction={Flex.directions.COLUMN} 
          justifyContent={Flex.justify.CENTER} 
          alignItems={Flex.align.CENTER} 
        >
            <OrderForm fragrances={fragrances} />
        </Flex>
      </div>
    );
};

export default App;
