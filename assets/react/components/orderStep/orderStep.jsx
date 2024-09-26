import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderStep = () => {
  const stepTitles = [
    {
      step: 1,
      name: "Vos documents",
    },
    {
      step: 2,
      name: "Option d'envoi",
    },
    {
      step: 3,
      name: "Type de courrier",
    },
    {
      step: 4,
      name: "Type de reliure",
    },
    {
      step: 5,
      name: "Adresse de livraison",
    },
  ];

  const [actualStep, setActualStep] = useState({});
  const step = useSelector((state) => state.order.step);

  useEffect(() => {
    const res = stepTitles.find((item) => item.step === step);
    setActualStep(res);
  }, []);

  return (
    <>
      <ol className="flex justify-center items-center w-full p-3 space-x-2 text-sm font-medium text-center  bg-white border border-gray-200 rounded-lg shadow-sm sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse">
        {stepTitles.map((value, key) => (
          <li
            key={key}
            className={`flex items-center gap-2 ${
              value.step == step
                ? "text-secondary"
                : value.step < step
                ? "text-primary"
                : "text-gray-500"
            } `}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                value.step === step
                  ? "border-secondary"
                  : value.step < step
                  ? "border-primary"
                  : "border-gray-500"
              }   `}
            >
              {value.step}
            </span>
            <span className="hidden sm:inline-flex">{value.name}</span>

            {value.step < 5 && (
              <svg
                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </>
  );
};

export default OrderStep;
