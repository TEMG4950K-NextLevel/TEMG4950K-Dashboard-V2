import { Modal, Label, TextInput, Button, Radio, Select } from "flowbite-react";
import { HiPlusSm } from "react-icons/hi";

export default function SettingModal({ modalIsopen, onClose }) {
  return (
    // main modal
    <>
      <Modal show={modalIsopen} size="6xl" popup={true} onClose={onClose}>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 mt-4">
            <h3 className="text-[40px] font-medium text-gray-900 dark:text-white">
              Choose your audience
              <h6 className="text-xs font-medium text-gray-900 dark:text-white">
                Please input your campaign target audience
              </h6>
            </h3>
          </div>

          <div className="flex flex-row place-content-center mt-4 mb-10">
            {/* left  */}
            <div className="flex flex-col space-y-4">
              <Label className="self-center" value="Audience" />
              <div className="flex flex-row items-center gap-3">
                <Label value="Income" className="w-16" />
                <TextInput
                  id="min-income"
                  placeholder="0"
                  required={true}
                  className="w-24"
                />
                <Label value="to" />
                <TextInput
                  id="max-income"
                  placeholder="99999"
                  required={true}
                  className="w-24"
                />
              </div>

              <div className="flex flex-row items-center gap-3">
                <Label value="Age" className="w-16" />
                <TextInput
                  id="min-age"
                  placeholder="0"
                  required={true}
                  className="w-24"
                />
                <Label value="to" />
                <TextInput
                  id="max-age"
                  placeholder="99"
                  required={true}
                  className="w-24"
                />
              </div>
              <div id="select" className="flex flex-row items-center gap-3">
                <Label value="Gender" className="w-16" />
                <Select id="gender" required={true} className="w-24">
                  <option>Male</option>
                  <option>Female</option>
                </Select>
              </div>

              <div className="flex flex-row items-center gap-3">
                <div className="mb-2 block">
                  <Label value="Keywords" className="w-16" />
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
              <Label className="self-center" value="Extra triggers " />
              
              {/* 1: WEATHER */}
              <div
                id="selectweather"
                className="flex flex-row items-center gap-3"
              >
                <Label value="Weather" />
                <Select id="weather" required={true}>
                  <option>Sunny</option>
                  <option>Rainy</option>
                </Select>
              </div>




              
              <div id="selectdaytime" className="flex flex-col gap-y-3">
                <Label value="Day and Time" />

                  <div className="flex flex-row items-center gap-3">
                    <Radio
                      id="everyday"
                      name="day"
                      value="everyday"
                      defaultChecked={true}
                      className="mr-2"
                    />
                    <Label className="w-20" value="Every day " />
                    <TextInput
                      id="min-time"
                      placeholder="11:00"
                      required={true}
                    />
                    <Label value="to" />
                    <TextInput
                      id="max-time"
                      placeholder="13:00"
                      required={true}
                    />
                  </div>


                <div className="flex flex-row-reverse">
                  <Button className="grow-0 w-[200px] ">
                    <HiPlusSm className="mr-2 h-5 w-5" />
                    Add another time
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Radio
                    id="everyday"
                    name="day"
                    value="everyday"
                    defaultChecked={false}
                    className="mr-2 self-start mt-3.5"
                  />
                  
                  <div className="flex flex-col gap-y-3">
                    <div className="flex flex-row items-center gap-3">
                      <Label className="w-20" value="Weekday" />
                      <TextInput
                        id="min-time"
                        placeholder="11:00"
                        required={true}
                      />
                      <Label value="to" />
                      <TextInput
                        id="max-time"
                        placeholder="13:00"
                        required={true}
                      />
                    </div>
                    <div className="flex flex-row items-center gap-3">
                      <Label className="w-20" value="Weekend" />
                      <TextInput
                        id="min-time"
                        placeholder="11:00"
                        required={true}
                      />
                      <Label value="to" />
                      <TextInput
                        id="max-time"
                        placeholder="13:00"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <Radio
                  id="everyday"
                  name="day"
                  value="everyday"
                  defaultChecked={false}
                  className="mr-2"
                />

                <Label value="Customize" />
              </div>
            </div>
          </div>

          {/*final TODO: click geofence -> show slide 24 stuff on right */}

          <div className="flex grow-0 mt-6 flex-row-reverse pr-5 mb-8">
            <Button onClick={onClose}>Save Changes</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
