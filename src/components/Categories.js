export default function Categories({ data }) {
  return (
    <div className="w-full h-screen flex justify-center items-center gap-4">
      {data.map((item) => (
        <div className="bg-white w-[250px] h-[100px] rounded-md shadow-lg flex justify-center items-center hover:cursor-pointer">
          <div className="text-black flex justify-center items-center text-[24px]">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
}
