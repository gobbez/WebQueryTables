import React from "react";
import { Accordion, Text, Button, Flex } from "@chakra-ui/react";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { AuthContext } from "./context/AuthContext";

function MenuComponent({ onMenuClick }) {
    // Check theme
    const { lightMode } = useContext(ThemeContext);
    // Check if user is logged
    const { isLogged } = useContext(AuthContext);
    // Define Button properties
    const buttonProps = {
        colorScheme: "teal",
        variant: "outline",
        className: lightMode ? "textforlight" : "textfordark",
    };

    return (
        <Flex justify="center" gap={4}>
            {/* CRUD Database Section */}
            <Flex>
                <Accordion.Root collapsible>
                    <Accordion.Item key="crudOptions" value="crudOptions">
                        <Accordion.ItemTrigger>
                            <Button {...buttonProps}>CRUD Database</Button>
                            <Accordion.ItemIndicator />
                        </Accordion.ItemTrigger>
                        <Accordion.ItemContent>
                            <Accordion.ItemBody>
                                {isLogged ? (
                                    <Flex direction="column" gap={2}>
                                        <Button {...buttonProps} onClick={() => onMenuClick("Create")}>
                                          Create
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
                    <Accordion.Item key="dataAnalysis" value="dataAnalysis">
                        <Accordion.ItemTrigger>
                            <Button {...buttonProps}>Data Analysis</Button>
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