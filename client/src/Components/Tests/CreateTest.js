import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

const CreateTest = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '']); // Initial state with 3 empty options

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleRemoveOption = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Do something with the question and options, such as sending them to a server
        console.log('Question:', question);
        console.log('Options:', options);
        // Reset the form after submission
        setQuestion('');
        setOptions(['', '', '']);
    };

    return (
        <div className="h-screen">
            <div className="h-20"></div>
            <div className=" bg-purple-900 md:w-3/5 w-11/12 m-auto md:p-5 p-2 py-2 text-white rounded-lg font-sans">
                <h1 className="text-center p-2 text-3xl bg-yellow-2">
                    Create Test
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="w-full text-black flex flex-col justify-center"
                >
                    <label className="w-full flex justify-center pb-1">
                        <textarea
                            className="w-2/3 p-2 outline-none rounded-lg"
                            rows={3}
                            value={question}
                            onChange={(event) =>
                                setQuestion(event.target.value)
                            }
                            placeholder="Enter your question here"
                            required
                        />
                    </label>
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="relative w-full md:w-3/5 p-1 flex justify-center items-center m-auto"
                        >
                            <input
                                className="px-2 py-1 rounded-md w-full h-10 outline-none pr-10" // Added pr-10 for padding on the right
                                type="text"
                                value={option}
                                placeholder={`Create Option ${index + 1}`}
                                onChange={(event) =>
                                    handleOptionChange(
                                        index,
                                        event.target.value
                                    )
                                }
                                required
                            />
                            {index > 2 && (
                                <button
                                    onClick={() => handleRemoveOption(index)}
                                    className="absolute right-0 flex items-center pr-3" // Positioned the delete button absolutely at the right end of the input
                                >
                                    <AiFillDelete size={25} color="red" />
                                </button>
                            )}
                        </div>
                    ))}

                    <div className="w-full flex justify-center flex-wrap text-black font-sans text-1xl items-center p-2 m-auto">
                        <button
                            type="button"
                            onClick={handleAddOption}
                            className="w-2/3 md:w-1/4 px-3 py-2 rounded-lg bg-green-500 mr-2 mb-2 lg:mb-0"
                        >
                            Add Option +
                        </button>
                        <button
                            type="submit"
                            className="w-2/3 md:w-1/4  px-3 py-2 rounded-lg bg-yellow-500"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTest;
