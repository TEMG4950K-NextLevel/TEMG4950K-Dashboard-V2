import { Modal,Label,TextInput,Button,Radio,Select } from "flowbite-react";
import Datepicker from "tailwind-datepicker-react";
import { HiCalendar} from "react-icons/hi";
import {useState} from 'react';

//https://github.com/OMikkel/tailwind-datepicker-react


export default function LaunchModal({launchIsOpen,onClose}){

    const startOptions = {
        title: "Start Date",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        minDate: new Date("2023-01-01"),
        theme: {
            background: "bg-gray-700 dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-red-500",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            // () => ReactElement | JSX.Element
           
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date("2023-05-01"),
        language: "en",
    }
    
    const endOptions = {
        title: "End Date",
        autoHide: true,
        todayBtn: false,
        clearBtn: true,
        maxDate: new Date("2030-01-01"),
        minDate: new Date("1950-01-01"),
        theme: {
            background: "bg-gray-700 dark:bg-gray-800",
            todayBtn: "",
            clearBtn: "",
            icons: "",
            text: "",
            disabledText: "bg-red-500",
            input: "",
            inputIcon: "",
            selected: "",
        },
        icons: {
            // () => ReactElement | JSX.Element
        },
        datepickerClassNames: "top-12",
        defaultDate: new Date("2023-05-01"),
        language: "en",
    }

    const [show, setShow] = useState(false);
	const [selectedDate, setSelectedDate] = useState(Date);
	const handleChange = (selectedDate) => {
		setSelectedDate(selectedDate);
	}
	const handleClose = (state: boolean) => {
		setShow(state);
	}


    return(
        // main modal
        <>
          <Modal
            show={launchIsOpen}
            size="2xl"
            popup={true}
            onClose={onClose}
          >
            <Modal.Header />
            <Modal.Body>

              <div className="space-y-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                <h3 className="text-4xl font-medium text-gray-900 dark:text-white ">
                  Launch Campaign
                </h3>
              </div>
              <hr className="mb-8"/>
    
                <div className="flex flex-col space-y-4 place-content-center px-6">
                    <Label className="text-xl" value="Brand Info"/>

                    <div className="flex flex-row space-x-3 ml-7 items-center">
                        <Label className="text-lg w-32" value="Campaign Name"/>
                        <TextInput
                        id="campaign-name"
                        placeholder="Adidas waterproof jacket"
                        required={true}
                        className="w-48"
                        />
                    </div>

                    <div className="flex flex-row space-x-3 ml-7 items-center">
                        <Label className="text-lg w-32" value="Billing Account" />
                        <Select
                            id="billing-account"
                            required={true}
                        >
                            <option>
                            Adidas-Account-1
                            </option>
                            <option>
                            Adidas-Account-2
                            </option>
                        
                        </Select>
                    </div>


                    <Label className="text-xl" value="Campaign Settings" />
                    <div className="flex flex-row space-x-3 ml-7 items-center">
                        <Label className="text-lg w-24" value="End Date" />
                        <Datepicker options={startOptions} onChange={handleChange} value={selectedDate} show={show} setShow={handleClose} /> 
                    </div>
        
            
                    <div className="flex flex-row space-x-3 ml-7 items-center">
                        <Label className="text-lg w-24" value="End Date" />
                        <Datepicker options={endOptions} onChange={handleChange} value={selectedDate} show={show} setShow={handleClose} /> 
                    </div>

                    <div className="flex flex-row space-x-3 ml-7 items-center">
                        <Label className="text-lg w-24" value="Budget Cap" />
                        <TextInput
                        id="budget-cap"
                        placeholder="$100,000"
                        required={true}
                        />
                    </div>

                </div>
             
        
             
           
          
          
        
              <div className="flex grow-0 mt-3 flex-row-reverse ">
                  <Button onClick={onClose}>
                    PURCHASE
                  </Button>
              </div>
             
            </Modal.Body>
          </Modal>
        </>
    );
}