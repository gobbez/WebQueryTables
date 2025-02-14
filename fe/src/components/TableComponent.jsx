import { Table, Text, Flex } from "@chakra-ui/react";

function TableComponent({ data }) {
    // Assicurati che data sia un array
    if (!Array.isArray(data)) {
        return <Text>Error while formatting data: no array</Text>;
    }

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
                <Table.Header bg="blu">
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
                                <Table.Cell>{db}</Table.Cell>
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
export default TableComponent;
