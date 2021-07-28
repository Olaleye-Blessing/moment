const FormContainer = ({ onSubmit, headerTitle, children }) => {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="mx-auto max-w-lg rounded box-shadow mt-4 px-5 pb-8 relative"
        >
            {headerTitle && (
                <h2 className="text-2xl sm:text-3xl font-bold text-center py-9">
                    {headerTitle}
                </h2>
            )}
            {children}
        </form>
    );
};

export default FormContainer;
