import { NextRequest } from "next/server";
import http2 from "http2";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return new Response("No URL provided", { status: 400 });
  }

  const getOpenGraphdata = async () => {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url);

      // Establish an HTTP/2 client session
      const clientSession = http2.connect(parsedUrl.origin); // Replace with your target URL

      // Handle session errors
      clientSession.on("error", (err) => {
        reject(err);
        console.error("Session Error:", err);
      });

      // Create an HTTP/2 request stream
      const req = clientSession.request({
        ":path": parsedUrl.pathname, // The path of the resource to request
        ":method": "GET", // The HTTP method
      });

      // Set the encoding for the response data
      req.setEncoding("utf8");

      // Handle the 'response' event to get response headers
      req.on("response", (headers) => {
        console.log("Response Headers:", headers);
      });

      // Handle the 'data' event to receive response body chunks
      let responseData = "";
      req.on("data", (chunk) => {
        console.log(chunk);
        responseData += chunk;
      });

      // Handle the 'end' event when the response is complete
      req.on("end", () => {
        console.log("Response Body:", responseData);
        resolve(responseData);
        clientSession.close(); // Close the session after the request is complete
      });

      //   // End the request stream (no body for GET requests)
      //   req.end();
    });
  };

  const result = await getOpenGraphdata();

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
