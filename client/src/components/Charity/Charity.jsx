const charities = [
  "St Jude's Children Hospital",
  "World Food Relief",
  "Gooners against Gang Violence",
  "Children's Health institute",
  "Beaters Fighting Bigotry",
  "Edgers Enriching Education",
];

const Charity = () => {
  return (
    <div className="px-8 py-4 h-[88vh]">
      <div className="text-wrap  w-1/2">
        <h1 className="text-[#2183d2] text-3xl font-bold font-[Kodchasan]">
          Donate Your Coins!
        </h1>
      </div>
      <div className="w-2/3 text-wrap mt-4">
        <p className="text-[#2183d2] text-sm font-[Kodchasan]">
          Your coins are converted to real currency to donate for your charity
          of choice!
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8 mt-12 h-[50vh] overflow-y-auto">
        {charities.map((charity) => (
          <div
            key={charity}
            className="rounded-md cursor-pointer border w-2/5 border-[#2183d2] px-4 py-4 text-center flex flex-col items-center justify-center hover:bg-[#2183d2] text-[#2183d2] hover:text-[#d2f8bd]"
          >
            <p className="font-[Kodchasan]">{charity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charity;
