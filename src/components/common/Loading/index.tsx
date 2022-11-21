const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="spinner-border border-none animate-spin inline-block w-8 h-8 border-4 rounded-full text-3xl text-fuchsia-500"
        role="status"
      >
        *
      </div>
      <span className="visually-hidden ml-3 font-thin">Verifying token...</span>
    </div>
  );
};

export default Loading;
