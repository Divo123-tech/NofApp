import { useParams } from 'react-router-dom';

const Donations = () => {
  const { charityName } = useParams(); // Extract the charityName from the URL

  // Function to handle the donation process
  const handleDonate = () => {
    const amount = document.getElementById('donationAmount').value;
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Please enter a valid donation amount.');
      return;
    }

    // Execute logic from index.js (or any other JavaScript file)
    console.log(`Donating $${amount} to ${decodeURIComponent(charityName)}`);
  };

  return (
    <div className="px-8 py-4 h-[88vh]">
      <div className="text-wrap  w-1/2">
            <h1 className="text-[#2183d2] text-3xl font-bold font-[Kodchasan]">
                Donation for {decodeURIComponent(charityName)}
            </h1>
        </div>
        
        <div className="w-2/3 text-wrap mt-4">
            <p className="text-[#2183d2] text-sm font-[Kodchasan]">
            Your coins are converted to real currency to donate for {decodeURIComponent(charityName)}
            </p>
        </div>

        {/* Input and Button */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <input
          type="number"
          id="donationAmount"
          placeholder="Enter donation amount"
          className="border border-[#2183d2] rounded-md px-4 py-2 w-64 text-[#2183d2] focus:outline-none focus:ring-2 focus:ring-[#2183d2]"
        />
        <button
          onClick={handleDonate}
          className="bg-[#2183d2] text-white px-6 py-2 rounded-md hover:bg-[#1a6ca8] transition-colors"
        >
          Donate Now
        </button>
      </div>
    </div>

  );
};

export default Donations;