import { useEffect, useState, useRef } from "react";
import { Table, Text, Flex } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

function SelectAllFromTableComponent({ data }) {
    const [tableData, setTableData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);
    

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
    
        fetch("https://appapi.pythonanywhere.com/select_all_from_table", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
        })
        .then((response) => {
            if (!response.ok) throw new Error("Error loading data");
            return response.json();
        })
        .then((result) => {
            toaster.success({ title: "Success", description: "Loaded all rows!", duration: 2000 });
            if (result.length > 0) {
                setColumns(Object.keys(result[0]));
                setTableData(result);
            }
        })
        .catch((error) => {
            toaster.error({ title: "Error", description: "Something went wrong.", duration: 2000 });
            setError(error.message);
        })
        .finally(() => setLoading(false));
    }, [data]);

    return (
        <Flex direction="column" align="center" gap={4} p={4}>
            <Flex overflow="hidden" whiteSpace="nowrap" width="100%" position="relative">
                <Text className="textforlight movingwarp">
                    {tableData.length > 0 ? `Rows of table ${(data)}` : `No rows in table ${(data)}`}
                </Text>
            </Flex>

            <Table.Root variant="outline" colorPalette="blu" showColumnBorder="true" interactive="true" width="100%">
                <Table.Header bg="blu">
                    <Table.Row>
                        {columns.map((col, index) => (
                            <Table.ColumnHeader key={index}>
                                <Text className="textforlight">{col}</Text>
                            </Table.ColumnHeader>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {tableData.map((row, rowIndex) => (
                        <Table.Row key={rowIndex}>
                            {columns.map((col, colIndex) => (
                                <Table.Cell key={colIndex}>{row[col]}</Table.Cell>
                            ))}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Flex>
    );
}

export default SelectAllFromTableComponent;
