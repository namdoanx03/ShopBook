import { useLocation } from "react-router-dom";

const Book = () => {
    let location = useLocation();

    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id

    console.log(">>> check book id: ", id)

    return (
        <div className="book">book</div>
    )
}
export default Book