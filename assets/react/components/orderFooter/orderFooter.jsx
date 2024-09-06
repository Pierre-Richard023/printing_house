import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { downStep, upStep, setOrderStatus } from "../../store/slice/orderSlice";
import { PAYMENT_LINK } from "../../utils/urls";

const OrderFooter = () => {
  const dispatch = useDispatch();
  const step = useSelector((state) => state.order.step);
  const stepValid = useSelector((state) => state.order.stepValid);
  const price = useSelector((state) => state.order.price);

  const nextStep = () => {
    dispatch(upStep());
  };

  const command = async () => {
    const data = {
      price,
      step,
    };
    dispatch(setOrderStatus(data));

    window.location = PAYMENT_LINK;
  };

  return (
    <>
      <div className="mt-4 border border-t-2 border-t-gray-800 ">
        <div className="p-2 grid grid-cols-2 md:grid-cols-3">
          Total{" "}
          <span className="place-self-end md:place-self-center">
            {" "}
            {price} €
          </span>
        </div>
        <div className=" mt-4 p-2 grid grid-cols-2 md:grid-cols-3">
          {step > 1 && (
            <div className="place-self-center md:place-self-start">
              <button
                type="button"
                className="px-8 py-3 mx-1 font-semibold rounded-full bg-primary text-white"
                onClick={(e) => dispatch(downStep())}
              >
                Retour
              </button>
            </div>
          )}
          <div className=" place-self-center md:place-self-end col-start-2 md:col-start-3">
            {step < 5 && (
              <button
                type="button"
                className={`px-8 py-3 font-semibold rounded-full  ${
                  stepValid
                    ? " bg-primary text-white"
                    : " bg-gray-400 cursor-not-allowed"
                } `}
                onClick={nextStep}
                disabled={!stepValid}
              >
                Suivant
              </button>
            )}
            {step === 5 && (
              <button
                type="button"
                className={`px-8 py-3 font-semibold rounded-full  ${
                  stepValid
                    ? " bg-primary text-white"
                    : " bg-gray-400 cursor-not-allowed"
                } `}
                onClick={command}
                disabled={!stepValid}
              >
                passer commande
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderFooter;
