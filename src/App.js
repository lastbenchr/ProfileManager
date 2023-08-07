import logo from "./logo.svg";
import "./App.css";
import Accordion from "./Accordion";
import { MainContainer } from "./components/Styles";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const AccordionData = [
    {
      title: `Routing Calls`,
      hiddenPara: `IVR systems are used to route incoming calls to the appropriate department or agent. By providing customers with a series of options, IVR can help reduce wait times and improve customer satisfaction.`,
      // hiddenImg: IMAGES.IVR1,
    },
    {
      title: `Basic Inquires and Transactions`,
      hiddenPara: `IVR systems can handle basic inquiries and transactions, such as checking account balances, making payments, and updating personal information. This can help businesses save time and resources by automating these processes and reducing the need for live agents.`,
      // hiddenImg: IMAGES.IVR2,
    },
    {
      title: `Surveys and Feedback`,
      hiddenPara: `IVR systems can be used to conduct surveys and gather feedback from customers. This can provide businesses with valuable insights into customer satisfaction and help identify areas for improvement.`,
      // hiddenImg: IMAGES.IVR3,
    },
    {
      title: `Appointment Scheduling`,
      hiddenPara: `IVR systems can be used to schedule appointments and send reminders to customers. This can help businesses manage their schedules more efficiently and reduce no-shows.`,
      // hiddenImg: IMAGES.IVR4,
    },
    {
      title: `Outbound Calls`,
      hiddenPara: `IVR systems can be used to make outbound calls to customers for a variety of purposes, such as appointment reminders, payment reminders, and surveys. Overall, IVR is a powerful tool for businesses and organizations looking to streamline their customer interactions, reduce wait times, and improve customer satisfaction.`,
      // hiddenImg: IMAGES.IVR5,
    },
  ];

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday hasn't occurred yet this year
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth &&
        currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <>
      <MainContainer>
        <Header />
        {AccordionData.map((ele, ind) => {
          return (
            <Accordion
              key={ind}
              title={ele.title}
              hiddenPara={ele.hiddenPara}
              // parentfun={handleImg}
              // hiddenImg={ele.hiddenImg}
              // pd={pd}
            />
          );
        })}
        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
