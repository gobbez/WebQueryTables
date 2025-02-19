import React, { useState, useEffect } from 'react';
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
    DialogRoot,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

const CreateTable = ({ onClose }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        tablename: '',
        columns: [{ name: '', type: 'VARCHAR' }],
    });

    const handleChange = (e, index, field) => {
        const value = e.target ? e.target.value : e; 

        if (field === 'tablename') {
            setFormData({ ...formData, tablename: value });
        } else if (index !== null) {
            const updatedColumns = [...formData.columns];
            updatedColumns[index][field] = value;
            setFormData({ ...formData, columns: updatedColumns });
        }
    };

    const addColumn = () => {
        setFormData({
            ...formData,
            columns: [...formData.columns, { name: '', type: 'VARCHAR' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const username = localStorage.getItem('username');
            const payload = { ...formData, username }; 

            // Create new table
            const response = await fetch('https://appapi.pythonanywhere.com/create_table', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) throw new Error('Network response was not ok');

            toaster.success({
                title: "Success",
                description: "New Table created!",
                duration: 2000,
            });
            setSuccess(true);
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

    // If creation is success pass the Close prop to the genitor (app.jsx)
    useEffect(() => {
        if (success) {
            onClose(); 
        }
    }, [success, onClose]);

    return (
        <VStack spacing={4} align="center">
            <Card.Root bgColor="#c3bffe" colorPalette="blue" width="350px" height="500px" overflowY="auto" padding={4}>
                <Flex>
                    <Flex width="100%" justify="center">
                        <Text textStyle="2xl" fontWeight="bold" className="fast_changecolor_blue">CREATE NEW TABLE</Text>
                    </Flex>
                    <DialogRoot>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                            <LuInfo />
                        </Button>
                    </DialogTrigger>
                    <DialogContent bg="white" color="black">
                        <DialogHeader>
                        <DialogTitle>
                            <Flex justify="center">
                                <Text textStyle="2xl" fontWeight="bold" className="fast_changecolor_blue">CREATE NEW TABLE</Text>
                            </Flex>
                        </DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <Text className="textforlight">
                                Here you can create a new table. <br />
                                TABLE NAME = Write the name of your new table <br />
                                COLUMN NAME = Write the name of your column(s) <br />
                                COLUMN TYPE = Select the type of your column(s) <br />
                                ---- <br />
                                <Table.Root bg="white" color="black">
                                    <Table.Header>
                                        <Table.Row bg="white">
                                            <Table.Cell>
                                                <Text className="textforlight">TYPE</Text>  
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Text className="textforlight">DESCRIPTION</Text>  
                                            </Table.Cell>  
                                        </Table.Row>  
                                    </Table.Header>        
                                    <Table.Body>
                                        <Table.Row bg="white">
                                            <Table.Cell>
                                                <Text className="textforlight">ID PRIMARY</Text>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Text className="textforlight">Create an ID INT AUTOINCREMENT as PRIMARY KEY</Text>
                                            </Table.Cell>  
                                        </Table.Row> 
                                        <Table.Row bg="white">
                                            <Table.Cell>
                                                <Text className="textforlight">VARCHAR</Text>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Text className="textforlight">Create a VARCHAR(255)</Text>
                                            </Table.Cell> 
                                        </Table.Row> 
                                        <Table.Row bg="white">
                                            <Table.Cell>
                                                <Text className="textforlight">INT</Text>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Text className="textforlight">Create a INT</Text>
                                            </Table.Cell> 
                                        </Table.Row> 
                                        <Table.Row bg="white">
                                            <Table.Cell>
                                                <Text className="textforlight">DATETIME</Text>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Text className="textforlight">
                                                    Create a DATETIME with CURRENT_TIMESTAMP in creation and update
                                                </Text>
                                            </Table.Cell> 
                                        </Table.Row>  
                                    </Table.Body>                    
                                </Table.Root>
                            </Text>
                        </DialogBody>
                        <DialogCloseTrigger />
                    </DialogContent>
                    </DialogRoot>
                </Flex>
                <Card.Header>
                    <Flex width="100%" justify="center">
                        <Text className="textforlight" textStyle="2xl" fontWeight="bold">Table Name</Text>
                    </Flex>
                </Card.Header>
                <Card.Body className="textforlight">
                    <Flex width="100%" justify="center">
                        <Input
                            type="text"
                            bgColor="#ffffff"
                            name="tablename"
                            placeholder="Enter table name"
                            width="300px"
                            value={formData.tablename}
                            onChange={(e) => handleChange(e, null, 'tablename')}
                        />
                    </Flex>
                    <Separator marginY={3} />
                    <Flex width="100%" justify="center">
                        <Text className="textforlight" textStyle="2xl" fontWeight="bold">Columns</Text>
                    </Flex>
                    <VStack spacing={2} width="100%">
                        <Table.Root>
                            <Table.Header>
                                <Table.Row bg="white">
                                    <Table.Cell>
                                        <Text className="textforlight">Column Name</Text>    
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Text className="textforlight">Column Type</Text>   
                                    </Table.Cell>                                
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {formData.columns.map((column, index) => (
                                    <Table.Row bg="white">
                                        <Table.Cell>
                                            <Input
                                                type="text"
                                                placeholder="Column"
                                                width="110%"
                                                value={column.name}
                                                onChange={(e) => handleChange(e, index, 'name')}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <select
                                                style={{ backgroundColor: "#ffffff" }}
                                                width="35%"
                                                value={column.type}
                                                onChange={(e) => handleChange(e, index, 'type')}
                                            >
                                                <option value="IDPRIMARY">ID PRIMARY</option>
                                                <option value="VARCHAR">VARCHAR</option>
                                                <option value="INT">INT</option>
                                                <option value="DATETIME">DATETIME</option>
                                            </select>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table.Root>
                    </VStack>
                    <Button onClick={addColumn} marginTop={3}>Add New Column</Button>
                </Card.Body>
                <Card.Footer>
                    <Flex justify="flex-end" width="100%">
                        <Button onClick={handleSubmit} disabled={loading}>
                            <Text>
                                {loading ? "Loading..." : "CREATE NEW TABLE"}
                            </Text> 
                        </Button>
                    </Flex>
                </Card.Footer>
            </Card.Root>
        </VStack>
    );
};

export default CreateTable;
