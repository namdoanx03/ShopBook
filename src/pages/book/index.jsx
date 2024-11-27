import { useLocation } from "react-router-dom";
import ViewDetail from "../../components/Book/ViewDetail";
import { fetchBookById } from "../../components/service/apiService";
import { useEffect, useState } from "react";

const Book = () => {
    let location = useLocation();

    const [dataBook, setDataBook] = useState()
    let params = new URLSearchParams(location.search);
    const id = params?.get("id"); // book id

    useEffect(() => {
        fetchBook(id);
    }, [id]);

    const fetchBook = async (id) => {
        const res = await fetchBookById(id);
        if (res && res.data) {
            let raw = res.data;
            //process data
            raw.items = getImages(raw);

            setTimeout(() => {
                setDataBook(raw);
            }, 1500)

        }
    }

    const getImages = (raw) => {
        const images = [];
        if (raw.thumbnail) {
            images.push(
                {
                    original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                    thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${raw.thumbnail}`,
                    originalClass: "original-image",
                    thumbnailClass: "thumbnail-image"
                },
            )
        }

        if (raw.slider) {
            raw.slider?.map(item => {
                images.push(
                    {
                        original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
                        originalClass: "original-image",
                        thumbnailClass: "thumbnail-image"
                    },
                )
            })
        }
        return images;
    }


    return (
        <>
            <ViewDetail dataBook={dataBook} />   
        </>
    )
}
export default Book