
import Cart from "@/components/Cart/Cart";

export default function Home() {


  return (
    <div className="px-5 lg:px-20 bg-lime-50 h-full w-full py-10">
      <h1 className="text-center text-xl lg:text-5xl font-medium">Welcome </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-10 w-full">
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />

      </div>


    </div>
  );
}
