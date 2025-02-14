import React from "react";
import { Accordion, Text, Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function MenuComponent({ onMenuClick }) {
    // Check if user is logged
    const { isLogged } = useContext(AuthContext);
    // Define Button properties
    const buttonProps = {
        colorScheme: "teal",
        variant: "surface",
        className: "textforlight",
        bg: "#1flvb8m",
    };

    return (
        <Flex justify="center" gap={4} className="textforlight">
            {/* CRUD Database Section */}
            <Flex>
                <Accordion.Root collapsible>
                    <Accordion.Item key="crudOptions" value="crudOptions">
                        <Accordion.ItemTrigger>
                            <Button colorPalette="blue" variant="surface" className="textblue">CRUD Database</Button>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                {isLogged ? (
                                    <Flex direction="column" gap={2}>
                                        <Button {...buttonProps} onClick={() => onMenuClick("CreateTable")}>
                                          Create Table
                                        </Button>
                                        <Button {...buttonProps} onClick={() => onMenuClick("CreateRow")}>
                                          Create Row
                                        </Button>
                                        <Button {...buttonProps} onClick={() => onMenuClick("Read")}>
                                          Read
                                        </Button>
                                        <Button {...buttonProps} onClick={() => onMenuClick("Update")}>
                                          Update
                                        </Button>
                                        <Button {...buttonProps} onClick={() => onMenuClick("Delete")} >
                                          Delete
                                        </Button>
                                    </Flex>
                                ) : (
                                    <Button {...buttonProps} onClick={() => onMenuClick("Read")}>
                                      Read
                                    </Button>
                                )}
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
            </Flex>

            {/* Data Analysis Section */}
            <Flex>
                <Accordion.Root collapsible>
                    <Accordion.Item key="dataAnalysis" value="EdaOptions">
                        <Accordion.ItemTrigger>
                            <Button colorPalette="blue" variant="surface" className="textblue">Data Analysis</Button>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                <Button {...buttonProps}>Option 1</Button>
                            </Accordion.ItemBody>
                        </Accordion.ItemContent>
                    </Accordion.Item>
                </Accordion.Root>
            </Flex>
        </Flex>
    );
}

export default MenuComponent;