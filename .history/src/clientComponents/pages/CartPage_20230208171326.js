import React from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import CartItem from "../components/products/shop/CartItem";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase-config";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import CheckOutCart from "../components/carts/CheckOutCart";
import swal from "sweetalert";

const CartPage = () => {
  const { carts } = useSelector((state) => state.cart);
  const [listCart, setListCart] = React.useState([]);
  React.useEffect(() => {
    let cartscp = [];
    [...carts].forEach(async (cart) => {
      const docRef = doc(db, "products", cart.productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        cartscp.push({ ...cart, productInfo: docSnap.data() });
        setListCart([...cartscp]);
      } else {
        console.log("No such document!");
      }
    });
  }, [carts]);
  React.useEffect(() => {
    const chooseAll = () => {
      console.log("ok");
    };
    const input = document.querySelectorAll(".choose-all");
    console.log(input);
  }, []);
  return (
    <>
      <Breadcrumb pageName="Giỏ hàng">
        <Link to="/shop">Sản Phẩm</Link>
        <span>
          <AiOutlineRight size={"0.75rem"}></AiOutlineRight>
        </span>
        <p className="text-[#b7b7b7]">Giỏ hàng</p>
      </Breadcrumb>
      {carts.length === 0 && (
        <div className="w-full pt-20 pb-48">
          <p className="text-2xl font-bold text-center">
            Chưa có sản phẩm nào trong giỏ hàng...
          </p>
        </div>
      )}
      {carts.length > 0 && (
        <div className="container py-14">
          <form>
            <table className="w-full border-collapse cart-table">
              <thead>
                <tr className="uppercase border-b border-black border-solid">
                  <th className="px-3">
                    <input
                      type="checkbox"
                      className="accent-[#e53637] choose-all"
                    />
                  </th>
                  <th className="text-left">Sản phẩm</th>
                  <th className="hidden md:block">Đơn giá</th>
                  <th>sl</th>
                  <th>Số tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="text-center align-middle">
                {listCart.map((cart, index) => (
                  <CartItem
                    key={uuidv4()}
                    cart={cart}
                    handleIncrease={async () => {
                      if (
                        cart.qty <
                        cart.productInfo.amount - cart.productInfo.sellNumber
                      ) {
                        const cartRef = doc(db, "carts", cart.id);
                        await updateDoc(cartRef, {
                          qty: cart.qty + 1,
                        });
                      } else {
                        swal("Không đủ số lượng hàng để cung cấp", "");
                      }
                    }}
                    handleReduced={async () => {
                      if (cart.qty > 1) {
                        const cartRef = doc(db, "carts", cart.id);
                        await updateDoc(cartRef, {
                          qty: cart.qty - 1,
                        });
                      }
                    }}
                    handleDelete={async () => {
                      await deleteDoc(doc(db, "carts", cart.id));
                    }}
                  ></CartItem>
                ))}
              </tbody>
            </table>
          </form>
          <CheckOutCart></CheckOutCart>
          <div className="box"></div>
        </div>
      )}
    </>
  );
};

export default CartPage;
