import { useState, useEffect } from "react";
import TableComponent from "../TableComponent";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toaster } from "@/components/ui/toaster";

function AllTables() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Check if user is logged
    const { isLogged } = useContext(AuthContext);
    const hasFetched = useRef(false);

    useEffect(() => {
    // Prevent double execution
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch("https://appapi.pythonanywhere.com/select_all")
        .then((response) => {
        if (!response.ok) {
            throw new Error("Errore nel Loading dei dati");
        }
        return response.json(); 
        })
        .then((data) => {
        toaster.success({
            title: "Success",
            description: "Loaded all tables!",
            duration: 2000,
        });
        setData(data);
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
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <TableComponent data={data} />
    );
}
export default AllTables;