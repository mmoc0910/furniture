import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCarts } from "../../../adminComponents/sagas/carts/cartSlice";
import { setUser } from "../../../adminComponents/sagas/user/userSlice";
import { auth, db } from "../../../firebase/firebase-config";
import { ShoppingIcon } from "../../../icons";
import Logo from "../../components/Logo";
import MenuHeader from "./MenuHeader";
import SearchBarHeader from "./SearchBarHeader";

const HeaderClient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [show, setShow] = React.useState(false);
  const { carts } = useSelector((state) => state.cart);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const colRef = collection(db, "carts");
        const q = query(
          colRef,
          orderBy("createdAt", "desc"),
          orderBy("productId"),
          where("userId", "==", user.uid)
        );
        onSnapshot(q, (snapshot) => {
          let data = [];
          snapshot.docs.forEach((doc, index) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          dispatch(setCarts(data));
        });
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // setUser(auth.currentUser);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log("Document data:", docSnap.data());
          dispatch(setUser({ ...docSnap.data() }));
        } else {
          console.log("No such document!");
        }
      } else {
        // setUser("");
        dispatch(setUser({}));
      }
    });
  }, [dispatch]);
  const totalCart = (carts) => {
    let num = 0;
    carts.forEach((item) => (num += item.qty));
    return num;
  };
  return (
    <>
      <Chat />

      <div className="hidden py-3 bg-black sm:block">
        <div className="container flex items-center justify-between text-white">
          <p>
            Miễn phí vận chuyển, bảo đảm đổi trả hoặc hoàn tiền trong 30 ngày.
          </p>
          {user.displayName ? (
            <div
              className="flex items-center justify-center w-8 h-8 overflow-hidden bg-white rounded-full uppercase font-extrabold cursor-pointer text-xl leading-none text-[#e53637]"
              onClick={() => navigate("./profile")}
            >
              {!user?.photoURL ? (
                user.displayName?.split("")[0]
              ) : (
                <img src={user?.photoURL} alt="avatar"></img>
              )}
            </div>
          ) : (
            <Link
              className="font-bold underline uppercase decoration"
              to={"/signin"}
            >
              sign in
            </Link>
          )}
        </div>
      </div>
      <div className="py-6">
        <div className="container flex items-center justify-between">
          <Logo></Logo>
          <MenuHeader className="hidden md:block"></MenuHeader>
          <div className="items-center hidden space-x-5 md:flex">
            <SearchBarHeader></SearchBarHeader>
            {/* <HeartIcon size="1.5rem" className="cursor-pointer"></HeartIcon> */}
            <Link to={"/cart"} className="relative cursor-pointer">
              <ShoppingIcon size="1.5rem"></ShoppingIcon>
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full -top-1/2 -right-1/2">
                {carts && totalCart(carts)}
              </span>
            </Link>
          </div>
          <span
            className="cursor-pointer md:hidden menu-icon"
            onClick={() => setShow(true)}
          >
            <AiOutlineMenu size="1.7rem"></AiOutlineMenu>
          </span>
        </div>
      </div>
      <div
        className={`fixed top-0 bottom-0 w-full z-40 md:opacity-0 md:invisible ${
          show ? "opacity-100 visible" : "opacity-0 invisible"
        } transition-all duration-500`}
      >
        <div
          className={`bg-[#00000080] absolute w-full h-full z-30 ${
            show ? "" : "opacity-0"
          } transition-all duration-500`}
          onClick={() => {
            setShow(false);
          }}
        ></div>
        <div
          className={`w-[300px] absolute top-0 bottom-0  bg-white z-40 opacity-100 pt-14 pl-10 ${
            show ? "left-0" : "-left-full"
          } transition-all duration-500`}
        >
          <Link className="text-sm uppercase">sign in</Link>
          <div className="flex items-center space-x-10 mt-7 mb-7">
            <SearchBarHeader></SearchBarHeader>
            {/* <HeartIcon size="1.5rem" className="cursor-pointer"></HeartIcon> */}
            <Link
              to={"/cart"}
              className="relative cursor-pointer"
              onClick={() => setShow(false)}
            >
              <ShoppingIcon size="1.5rem"></ShoppingIcon>
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-black rounded-full -top-1/2 -right-1/2">
                {carts?.length}
              </span>
            </Link>
          </div>
          <MenuHeader></MenuHeader>
        </div>
      </div>
    </>
  );
};

const Chat = () => {
  return (
    <div className="fixed z-50 w-16 h-16 right-10 bottom-10">
      <div className="absolute w-[350px] h-[450px] bg-white shadow-chat rounded-lg bottom-8 right-20">
        <div className="flex flex-col justify-between w-full h-full px-5">
          <div className="flex items-center w-full py-3">
            <p className="text-lg font-bold text-[#32776b]">Furniture</p>
            <span className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#32776b"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </div>
          <div className=""></div>
          <div className="py-3">
            <form
              className="flex items-center justify-between w-full"
              // onSubmit={async (e) => {
              //   e.preventDefault();
              //   try {
              //     const chatRef = doc(db, "chats", user.id);
              //     await updateDoc(chatRef, {
              //       messages: arrayUnion({
              //         sendAt: dayjs().unix(),
              //         message: colRef.current.value,
              //         isAdmin: true,
              //         dataType: "text",
              //       }),
              //     });
              //     const chatUserRef = doc(db, "chatUsers", user.id);
              //     await updateDoc(chatUserRef, {
              //       lastMessage: colRef.current.value,
              //       sendTime: dayjs().unix(),
              //     });
              //     colRef.current.value = "";
              //   } catch (err) {
              //     console.log(err);
              //   }
              // }}
            >
              <input className="px-3 py-1 bg-[#efefef] rounded-full outline-none max-w-[80%] w-full" />
              <label htmlFor="image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#32776b"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <input type="file" className="hidden" id="image" />
              <button type="submit">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="#32776b"
                    className="w-6 h-6"
                  >
                    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full h-full bg-[#4d7a94] rounded-full text-white flex justify-center items-center cursor-pointer">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-9 h-9"
          >
            <path
              fillRule="evenodd"
              d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default HeaderClient;
