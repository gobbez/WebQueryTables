import { useState, useEffect } from "react";
import TableComponent from "../TableComponent";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function AllDatabases() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Check if user is logged
    const { isLogged } = useContext(AuthContext);

    useEffect(() => {
    fetch("https://appapi.pythonanywhere.com")
        .then((response) => {
        if (!response.ok) {
            throw new Error("Errore nel caricamento dei dati");
        }
        return response.json(); 
        })
        .then((data) => {
        setData(data);
        })
        .catch((error) => {
        setError(error.message);
        })
        .finally(() => {
        setLoading(false);
        });
    }, []);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div>
            <h1>Dati ricevuti: {isLogged ? "You are logged" : "You are not logged"}</h1>
            <TableComponent data={data} />
        </div>
    );
}
export default AllDatabases;