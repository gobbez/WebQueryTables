import { useState } from "react";
import { Table, Text, Flex, Button } from "@chakra-ui/react";
import SelectAllFromTableComponent from "./SelectTableComponent";


function TablesComponent({ data }) {
    const [openTable, setOpenTable] = useState("");
    const buttonProps = {
        colorScheme: "teal",
        variant: "surface",
        className: "textforlight",
        bg: "#d4e2fd",
    };

    // Check if it's an array
    if (!Array.isArray(data)) {
        return <Text>Error while formatting data: no array</Text>;
    }

    {/* If user clicks on a table then shows the results */}
    if (openTable) {
        return (
        <>
            <Flex justify="flex-end">
                <Button {...buttonProps} onClick={() => setOpenTable("")}>
                    Back to Tables
                </Button>
            </Flex>
            <SelectAllFromTableComponent data={openTable} />
        </>
        );
    }

    {/* Else show the list of tables */}
    return (
        <Flex direction="column" align="center" gap={4} p={4}>
            {/* Moving text */}
            <Flex overflow="hidden" whiteSpace="nowrap" width="100%" position="relative">
                <Text className="textforlight movingwarp">
                    {data.lenght > 0 ? (
                        "This is the table you have created!"
                    ) : (
                        "These are the tables you have created!"
                    )}
                </Text>
            </Flex>

            {/* Table */}
            <Table.Root variant="outline" colorPalette="blu" showColumnBorder="true" interactive="true" width="350px" >
                <Table.Header bg="white">
                    <Flex justify="center">
                        <Table.Row>
                            <Table.ColumnHeader>
                                <Text className="textforlight">Table Name</Text>
                            </Table.ColumnHeader>
                        </Table.Row>
                    </Flex>
                </Table.Header>
                <Table.Body>
                    <Flex justify="center">
                        {data.map((db, index) => (
                            <Table.Row key={index}>
                                <Table.Cell>
                                    <Button {...buttonProps} onClick={() => setOpenTable(db)}>{db}</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Flex>
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.Cell />
                    </Table.Row>
                </Table.Footer>
            </Table.Root>
        </Flex>
    );
}
export default TablesComponent;
