
import { Modal,Label,TextInput,Button,Radio,Select } from "flowbite-react";
import {HiPlusSm} from "react-icons/hi";


export default function SettingModal({modalIsopen,onClose}){

return(

// main modal
<>
  <Modal
    show={modalIsopen}
    size="7xl"
    popup={true}
    onClose={onClose}
  >
    <Modal.Header />
    <Modal.Body>
      <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">
          Choose your audience
          <h6 className="text-xs font-medium text-gray-900 dark:text-white">
          Please input your campaign target audience
          </h6>
        </h3>
      </div>
      
      <div className="flex flex-row">

        {/* left  */}
      <div className="flex flex-col space-y-4">
        <Label className="ml-[180px]"  value="Audience" />
        <div className="flex flex-row">
            <Label
              value="Income"
            />
          <TextInput
            id="min-income"
            placeholder="0"
            required={true}
          />
          <Label value="to"/>
          <TextInput
            id="max-income"
            placeholder="99999"
            required={true}
          />
        </div>

        <div className="flex flex-row">
          <div className="mb-2 block">
            <Label
              value="Age"
            />
          </div>
          <TextInput
            id="min-age"
            placeholder="0"
            required={true}
          />
          <Label value="to"/>
          <TextInput
            id="max-age"
            placeholder="99"
            required={true}
          />
        </div>
    <div id="select" className="flex flex-row">  
    <Label
      value="Gender"
    />
      <Select
        id="gender"
        required={true}
      >
        <option>
          Male
        </option>
        <option>
          Female
        </option>
      
      </Select>
    </div>

    <div className="flex flex-row">
          <div className="mb-2 block">
            <Label
              value="Keywords"
            />
          </div>
          <TextInput
            id="keywords"
            placeholder="enter keywords"
            required={true}
          />
        
    </div>

    </div>
    

      {/* right side */}
      <div className="flex flex-col mx-3 space-y-4 ml-[100px]">
      <Label className="ml-[200px]" value="Extra triggers " />
      <div id="selectweather" className="flex flex-row">  
        <Label
          value="Weather"
        />
          <Select
            id="weather"
            required={true}
          >
            <option>
              Sunny
            </option>
            <option>
              Rainy
            </option>
          
          </Select>
      </div>

      <div id="selectdaytime" className="flex flex-row"> 
      <Label value="Day and Time"/>
      <div className="flex flex-row mx-2">
        <Radio
        id="everyday"
        name="day"
        value="everyday"
        defaultChecked={true}
        className="mr-2"
        />
        <Label className="mr-2" value="Every day "/>
        <TextInput
            id="min-time"
            placeholder="11:00"
            required={true}
          />
          <Label value="to"/>
          <TextInput
            id="max-time"
            placeholder="13:00"
            required={true}
          />
      </div>
      </div>

      <div className="flex flex-row-reverse">
      <Button className="grow-0 w-[200px] ">
      <HiPlusSm className="mr-2 h-5 w-5" />
      Add another time
      </Button>
      </div>

      <div id="selectdaytime" className="flex flex-row ml-[100px]"> 
      <div className="flex flex-col ">
        <div className="flex flex-row ">
        <Radio
        id="everyday"
        name="day"
        value="everyday"
        defaultChecked={false}
        className="mr-3"
        />
        <Label className="mr-3" value="weekday "/>
        <TextInput
            id="min-time"
            placeholder="11:00"
            required={true}
            />
          <Label value="to"/>
          <TextInput
            id="max-time"
            placeholder="13:00"
            required={true}
            />
        </div>

        <div className="flex flex-row ml-[15px]">
        <Label className="mx-3" value="weekend "/>
        <TextInput
            id="min-time"
            placeholder="11:00"
            required={true}
            />
          <Label value="to"/>
          <TextInput
            id="max-time"
            placeholder="13:00"
            required={true}
            />
        </div>
      </div>
      </div>

      <div className="flex flex-row ml-[100px]">

      <Radio
        id="everyday"
        name="day"
        value="everyday"
        defaultChecked={false}
        className="mr-3"
        />
        
        <Label value="Customize"/>

      </div>


      



      </div>



    </div>
      {/*final TODO: click geofence -> show slide 24 stuff on right */}
  
  

      <div className="flex grow-0 mt-3 flex-row-reverse ">
          <Button onClick={onClose}>
            Save Changes
          </Button>
      </div>
     
    </Modal.Body>
  </Modal>
</>
);
}
