import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Input, VStack, Flex, Text, Card, Separator, Table } from '@chakra-ui/react';
import { toaster } from "@/components/ui/toaster";
import { LuInfo } from "react-icons/lu"
import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogRoot,
    DialogTrigger,
} from "@/components/ui/dialog"

const AddRow = ({ tablename }) => {
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({});
    const hasFetched = useRef(false);

    /* Get columns via API */
    useEffect(() => {
        // Prevent double execution
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetch("https://appapi.pythonanywhere.com/get_columns", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([tablename])
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error loading data");
            }
            return response.json();
        })
        .then((data) => {
            setColumns(data); // Salva i nomi delle colonne
            // Crea un formData per ciascuna colonna
            const initialFormData = data.reduce((acc, column) => {
                acc[column] = ''; // Imposta i valori iniziali del form
                return acc;
            }, {});
            setFormData(initialFormData);
        })
        .catch((error) => {
            toaster.error({
                title: "Error",
                description: "Something went wrong. Please try again.",
                duration: 2000,
            });
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [tablename]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleChange = (e, column) => {
        setFormData({ ...formData, [column]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const username = localStorage.getItem('username');
            const payload = { tablename, columns: formData, username };
            console.log(payload);

            // Send the new row data to the backend
            const response = await fetch('https://appapi.pythonanywhere.com/create_row', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error('Network response was not ok');

            toaster.success({
                title: "Success",
                description: "New row added!",
                duration: 2000,
            });
        } catch (error) {
            toaster.error({
                title: "Error",
                description: "Something went wrong. Please try again.",
                duration: 2000,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <VStack spacing={4} align="center">
            <Card.Root bgColor="#c3bffe" colorPalette="blue" width="350px" height="500px" overflowY="auto" padding={4}>
                <Flex>
                    <Flex width="100%" justify="center">
                        <Text textStyle="xl" fontWeight="bold" className="fast_changecolor_blue">{tablename} - ADD NEW ROW</Text>
                    </Flex>
                </Flex>

                <Card.Header>
                    <Flex width="100%" justify="center">
                        <Text className="textforlight" textStyle="2xl" fontWeight="bold">Table Name</Text>
                    </Flex>
                </Card.Header>
                <Card.Body className="textforlight">
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={2} width="100%">
                            {columns.map((column) => (
                                <Flex key={column} direction="column" width="100%">
                                    <Text className="textforlight" textStyle="xl">{column}</Text>
                                    <Input
                                        type="text"
                                        name={column}
                                        value={formData[column] || ''}
                                        onChange={(e) => handleChange(e, column)}
                                        placeholder={`Enter value for ${column}`}
                                    />
                                </Flex>
                            ))}
                        </VStack>
                        <Button type="submit" marginTop={3} disabled={loading}>
                            {loading ? "Loading..." : "CREATE NEW ROW"}
                        </Button>
                    </form>
                </Card.Body>
            </Card.Root>
        </VStack>
    );
};

export default AddRow;
