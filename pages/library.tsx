import LibraryCard from "@/components/card";
import type { NextPage } from "next";

const mockData = [
    {
        group: "luvzee",
        name: "vakságból kiérve",
        image: "https://luvzee.shie1bi.hu/img/vaksagbol-kierve-cover.jpg",
        date: new Date(),
        items: 7,
        type: 1,
        description: "Lorem ipsum dolor sit amet."
    }
]

const Library: NextPage = () => {
    return (<>
        {mockData.map((item, index) => {
            return (<LibraryCard key={index} {...item} />)
        })}
    </>)
}

export default Library;