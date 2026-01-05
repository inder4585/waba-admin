import React, { useState } from "react";
import { FaList, FaTimes, FaPlus, FaTrash } from "react-icons/fa";
import { Transition } from "@headlessui/react";
import InputComponent from "../Form/Input";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const List = ({ sections, setSections }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const updateSectionTitle = (index, value) => {
    const newSections = [...sections];
    newSections[index].title = value;
    setSections(newSections);
  };

  const updateItem = (sectionIndex, itemIndex, field, value) => {
    const newSections = [...sections];
    newSections[sectionIndex].sectionList[itemIndex][field] = value;
    setSections(newSections);
  };

  const addItem = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].sectionList.push({ title: "", description: "" });
    setSections(newSections);
  };

  const deleteItem = (sectionIndex, itemIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].sectionList.splice(itemIndex, 1);
    setSections(newSections);
  };

  const addSection = () => {
    setSections([...sections, { title: "", sectionList: [] }]);
  };

  const deleteSection = (index) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  return (
    <>
      <button
        className="text-blue-500 my-1 w-full px-3 py-2 text-xs bg-white flex items-center justify-center font-bold rounded-lg"
        onClick={toggleOverlay}
      >
        <FaList className="mr-1" /> Add List
      </button>
      <Transition
        show={isOpen}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-full max-w-md mx-auto rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">List</h2>
              <button onClick={toggleOverlay}>
                <FaTimes />
              </button>
            </div>
            <SimpleBar style={{ maxHeight: "400px" }}>
              <div className="border-t">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    <div className="p-4 border-b flex items-center justify-between">
                      <InputComponent
                        label={`Section ${sectionIndex + 1} Title`}
                        description="Section Title"
                        placeholder="Section Title"
                        value={section.title}
                        onChange={(e) =>
                          updateSectionTitle(sectionIndex, e.target.value)
                        }
                        tooltip="Enter section title"
                        required={true}
                      />
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => deleteSection(sectionIndex)}
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="p-4">
                      {section.sectionList.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center space-x-2 mb-2"
                        >
                          <InputComponent
                            label={`Title`}
                            description=" Title"
                            placeholder=" Title"
                            value={item.title}
                            onChange={(e) =>
                              updateItem(
                                sectionIndex,
                                itemIndex,
                                "title",
                                e.target.value
                              )
                            }
                            tooltip="Enter item title"
                            required={true}
                          />
                          <InputComponent
                            label={` Description`}
                            description=" Description"
                            placeholder=" Description"
                            value={item.description}
                            onChange={(e) =>
                              updateItem(
                                sectionIndex,
                                itemIndex,
                                "description",
                                e.target.value
                              )
                            }
                            tooltip="Enter item description"
                            required={true}
                          />
                          <button
                            className="text-red-500"
                            onClick={() => deleteItem(sectionIndex, itemIndex)}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      ))}
                      <button
                        className="text-blue-500 mt-2 flex items-center"
                        onClick={() => addItem(sectionIndex)}
                        disabled={section.sectionList.length >= 10}
                      >
                        <FaPlus className="mr-1" /> Add Item
                      </button>
                    </div>
                  </div>
                ))}
                <div className="p-4">
                  <button
                    className="text-blue-500 mt-2 flex items-center"
                    onClick={addSection}
                    disabled={sections.length >= 10}
                  >
                    <FaPlus className="mr-1" /> Add Section
                  </button>
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default List;
