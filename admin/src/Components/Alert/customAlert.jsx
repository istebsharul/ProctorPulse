import { toast } from 'react-hot-toast';

const showCustomAlert = (onConfirm) => {
    toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white/50 backdrop-blur-md shadow-lg rounded-lg pointer-events-auto flex flex-col ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex w-full p-4">
                <div className="w-full flex">
                    <div className="w-full ml-3 flex flex-col justify-center items-center text-xl">
                        <h1 className='text-2xl text-red-500'>Attention! </h1>
                        <p className="text-sm font-medium text-gray-900">
                            Your data will be deleted.
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                            Are you sure you want to go back?
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex">
                <button
                    onClick={() => {
                        toast.dismiss(t.id);
                    }}
                    className="w-full border border-transparent rounded-none rounded-l-lg p-4 flex items-center justify-center text-sm font-medium text-green-600 hover:bg-green-500 hover:text-white" 
                >
                    No
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        toast.dismiss(t.id);
                    }}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:bg-red-500 hover:text-white"
                >
                    Yes
                </button>

            </div>
        </div>
    ));
};

export default showCustomAlert;
