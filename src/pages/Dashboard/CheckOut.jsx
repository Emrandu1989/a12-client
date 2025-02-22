import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const CheckoutForm = ({ totalToPay, selectedEmail, month, year }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const navigate = useNavigate();
  const today = new Date();
  const currentDate = `${today.getDate().toString().padStart(2, "0")}/${
    today.getMonth() + 1
  }/${today.getFullYear()}`;
  useEffect(() => {
    if (totalToPay > 0) {
      fetch("https://machine-world-server.vercel.app/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: totalToPay }),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.clientSecret);
          setClientSecret(data.clientSecret);
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
        });
    }
  }, [totalToPay]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log('payment error', error);
      setError(error.message);
      return;
    }

    setError("");

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      // console.log('confirm error');
      return;
    }

    // console.log('payment intent', paymentIntent);
    if (paymentIntent.status === "succeeded") {
      // console.log('transaction id', paymentIntent.id);
      setTransactionId(paymentIntent.id);

      const payment = {
        email: selectedEmail,
        price: totalToPay,
        transactionId: paymentIntent.id,
        SubmitDate: currentDate,
        month: month,
        year: year,
      };

      fetch("https://machine-world-server.vercel.app/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log('payment saved', data);

          if (data?.result?.acknowledged && data?.result?.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Thank you for Pay Your Rent",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/payment-history");
          }
        })
        .catch((error) => {
          console.error("Error saving payment:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="w-[450px]"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn bg-green-500 text-white my-4"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {error && <p className="text-red-600">{error}</p>}
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
