import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { captureAndFinalizePaymentService } from "@/services";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaypalPaymentReturnPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage?.getItem("currentOrderId"));

        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId
        );

        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
          window.location.href = "/student-courses"
        }
      }

      capturePayment();
    }
  }, [paymentId, payerId]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="animate-pulse">
          Processing Payment Wait...
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalPaymentReturnPage;

// "use client";

// import React from "react";
// import { useLocation } from "react-router-dom";
// import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
// import { Loader2, CheckCircle2, XCircle } from "lucide-react";
// import { cn } from "@/lib/utils"; // Optional: for className merging

// const PaypalPaymentReturnPage = () => {
//     const location = useLocation();
//     const params = new URLSearchParams(location.search);

//     const paymentStatus = params.get("status") || "processing";

//     const getStatusUI = (status) => {
//         switch (status) {
//             case "success":
//                 return {
//                     icon: <CheckCircle2 className="text-green-500 w-10 h-10" />,
//                     message: "Payment Successful 🎉",
//                     color: "text-green-600",
//                 };
//             case "cancel":
//                 return {
//                     icon: <XCircle className="text-red-500 w-10 h-10" />,
//                     message: "Payment Cancelled ❌",
//                     color: "text-red-600",
//                 };
//             default:
//                 return {
//                     icon: <Loader2 className="animate-spin text-blue-500 w-10 h-10" />,
//                     message: "Processing Payment, Please Wait...",
//                     color: "text-blue-600",
//                 };
//         }
//     };

//     const statusUI = getStatusUI(paymentStatus);

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-100 to-slate-200 px-4">
//             <Card className="w-full max-w-md shadow-lg border-blue-300 border">
//                 <CardHeader className="flex flex-col items-center gap-2">
//                     {statusUI.icon}
//                     <CardTitle className={`text-xl font-bold ${statusUI.color}`}>
//                         {statusUI.message}
//                     </CardTitle>
//                 </CardHeader>
//                 <CardContent className="text-center text-sm text-muted-foreground">
//                     You will be redirected soon or you can close this page.
//                 </CardContent>
//                 <CardFooter className="justify-center text-xs text-gray-500">
//                     Thank you for choosing Softmore IT Solutions.
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// };

// export default PaypalPaymentReturnPage;
