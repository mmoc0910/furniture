import { onAuthStateChanged } from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCarts } from "../../../adminComponents/sagas/carts/cartSlice";
import { setUser } from "../../../adminComponents/sagas/user/userSlice";
import { auth, db } from "../../../firebase/firebase-config";
import { dateFormat } from "../../../helpers/function";
import { ShoppingIcon } from "../../../icons";
import Logo from "../../components/Logo";
import MenuHeader from "./MenuHeader";
import SearchBarHeader from "./SearchBarHeader";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
const url = "https://api.cloudinary.com/v1_1/ds32vmzcc/image/upload";

const HeaderClient = () => {
  const [state, setState] = React.useState(false);
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
      {auth.currentUser && (
        <div className="fixed z-50 w-16 h-16 right-10 bottom-10">
          <Chat />
          <div
            className="w-full h-full bg-[#4d7a94] rounded-full text-white flex justify-center items-center cursor-pointer"
            onClick={() => setState((state) => !state)}
          >
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
      )}
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
  const [state, setState] = React.useState(false);
  const [messages, setMessages] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [files, setFiles] = React.useState([]);
  const inputFileRef = React.useRef(null);
  const colRef = React.useRef(null);
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    scrollRef.current.scroll(0, scrollRef.current.scrollHeight);
  }, [messages, state]);
  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, "chats", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setMessages(docSnap.data().messages);
        } else {
          await setDoc(doc(db, "chatUsers", user.uid), {
            userInfo: {
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            lastMessage: "",
            sendTime: 0,
          });
          await setDoc(doc(db, "chats", user.uid), {
            messages: [],
          });
        }
      }
    });
  }, []);
  React.useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        onSnapshot(doc(db, "chats", uid), (doc) => {
          setMessages(doc.data()?.messages);
        });
      }
    });
  }, []);
  const handleChangeFile = () => {
    const selectedFiles = inputFileRef.current.files;
    const selectedFilesArray = Array.from(selectedFiles);
    setFiles((curFiles) => [...curFiles, ...selectedFilesArray]);
    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setImages((curImages) => [...curImages, ...imagesArray]);
  };
  const uploadImages = async () => {
    const formData = new FormData();
    let images = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      formData.append("file", file);
      formData.append("upload_preset", "my_uploads");
      const data = await fetch(url, {
        method: "POST",
        body: formData,
      }).then((response) => response.json());
      images.push(data.secure_url);
    }
    // console.log(images);
    return images;
  };
  return (
    <>
      <div className="fixed z-50 w-16 h-16 right-10 bottom-10">
        <div
          className="w-full h-full bg-[#4d7a94] rounded-full text-white flex justify-center items-center cursor-pointer"
          onClick={() => setState((state) => !state)}
        >
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
    </>
  );
};
const Message = ({ message }) => {
  const [show, setShow] = React.useState(false);

  return (
    <>
      {message.dataType === "text" && (
        <div onClick={() => setShow((show) => !show)}>
          <div
            className={`px-3 leading-tight py-[5px] rounded-lg w-max max-w-[75%] mt-1 break-words ${
              message.isAdmin
                ? "text-black bg-[#d7d7d6]"
                : "text-white bg-[#32776b] ml-auto"
            }`}
          >
            {message.message}
          </div>
          {show && (
            <p className={`text-xs ${message.isAdmin ? "" : "text-right"}`}>
              {dateFormat(message.sendAt, "DD-MM-YYYY HH:mm")}
            </p>
          )}
        </div>
      )}
      {message.dataType === "image" && (
        <div className="mb-2" onClick={() => setShow((show) => !show)}>
          <div
            className={`w-[70%] grid gap-1 mt-3 ${
              message.message.length === 1
                ? "grid-cols-1"
                : message.message.length >= 2 && message.message.length <= 3
                ? `grid-cols-${message.message.length}`
                : "grid-cols-3"
            } ${!message.isAdmin && "ml-auto"}`}
          >
            {message.message.map((image) => (
              <img
                key={uuidv4()}
                src={image}
                alt=""
                className="w-full h-full col-span-1 rounded-lg max-h-[350px]"
              />
            ))}
          </div>
          {show && (
            <p className={`text-xs ${!message.isAdmin && "text-right"}`}>
              {dateFormat(message.sendAt, "DD-MM-YYYY HH:mm")}
            </p>
          )}
        </div>
      )}
    </>
  );
};
export default HeaderClient;
