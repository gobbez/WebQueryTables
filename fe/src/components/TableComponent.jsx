import { Table } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";

function TableComponent({ data }) {
    // Assicurati che data sia un array
    if (!Array.isArray(data)) {
        return <Text>Error while formatting data: no array</Text>;
    }

    return (
        <Table.Root variant="outline" showColumnBorder="true" interactive="true">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeader />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((db, index) => (
                    <Table.Row key={index}>
                        <Table.Cell>{db}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.Cell />
                </Table.Row>
            </Table.Footer>
        </Table.Root>
    );
}
export default TableComponent;
