import { Categories } from "@/types"

export const getSectionLabel = (category: Categories) => {
    if(category === "menWatches"){
        return "Men's Watches";
    } else if(category === "womenWatches"){
        return "Women's Watches";
    } else if(category === "purses"){
        return "Purses";
    } else if(category === "jewellery"){
        return "Jewellery";
    } else if(category === "WishList"){
        return "Wish List";
    }
}