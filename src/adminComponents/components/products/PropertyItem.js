import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProperties } from "../../sagas/property/propertySlice";
import { v4 as uuidv4 } from "uuid";
import { setProduct } from "../../sagas/products/productSlice";

const PropertyItem = ({ propName }) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.product.product);
  React.useEffect(() => {
    ref.current.addEventListener("wheel", (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      console.log(delta);
      ref.current.scrollLeft += delta;
    });
  }, []);
  return (
    <div className="px-5 py-2 bg-white rounded-lg group">
      <div className="flex items-center gap-2">
        <span className="font-bold whitespace-nowrap">{propName}</span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-inherit"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <div
          className="flex w-full h-full gap-3 overflow-y-auto box-scroll"
          ref={ref}
        >
          {properties[propName] &&
            properties[propName].map((value) => (
              <div
                key={uuidv4()}
                className="gap-1 bg-[#eaeaf1] rounded-lg px-2 whitespace-nowrap group/delete flex items-center pr-1 cursor-default"
              >
                {value}
                <span
                  className="cursor-pointer group-hover/delete:max-w-[20px] max-w-[1px] w-full overflow-hidden transition-all duration-300"
                  onClick={() => {
                    const arr = [...properties[propName]];
                    dispatch(
                      setProduct({
                        name: "properties",
                        value: {
                          ...properties,
                          [propName]: [...arr].filter((item) => item !== value),
                        },
                      })
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </span>
              </div>
            ))}
        </div>
        <form
          autoComplete="off"
          className="ml-auto max-w-[100px]"
          onSubmit={(e) => {
            e.preventDefault();
            const arr = [...properties[propName]];
            arr.push(`${e.target.elements[propName].value}`);
            dispatch(
              setProduct({
                name: "properties",
                value: {
                  ...properties,
                  [propName]: arr,
                },
              })
            );
          }}
        >
          <input
            type="text"
            name={propName}
            className="w-full bg-[#eaeaf1] outline-none px-2 rounded-lg text-sm py-[2px]"
          />
        </form>
        <span
          className="w-full cursor-pointer max-w-[1px] overflow-hidden group-hover:max-w-[16px] transition-all duration-300"
          onClick={() => {
            console.log("ok");
            const obj = JSON.parse(JSON.stringify(properties));
            delete obj[propName];
            dispatch(
              setProduct({
                name: "properties",
                value: obj,
              })
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default PropertyItem;
