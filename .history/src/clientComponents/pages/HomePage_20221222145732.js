import React, { useEffect } from "react";
import BannerHomePage from "../components/banners/BannerHomePage";
import CollectionList from "../components/collections/CollectionList";
import ProductHomePage from "../components/products/home/ProductHomePage";
import WOW from "wowjs";
import DiscountHomePage from "../components/discounts/DiscountHomePage";
import InstagramFurniture from "../components/InstagramFurniture";
import BlogHomePage from "../components/blogs/BlogHomePage";

const HomePage = () => {
  useEffect(() => {
    new WOW.WOW({
      live: false,
    }).init();
  }, []);
  return (
    <div className="flex flex-col gap-y-24">
      <BannerHomePage></BannerHomePage>
      <CollectionList></CollectionList>
      <ProductHomePage></ProductHomePage>
      <DiscountHomePage></DiscountHomePage>
      <InstagramFurniture></InstagramFurniture>
      <BlogHomePage></BlogHomePage>
    </div>
  );
};

export default HomePage;
