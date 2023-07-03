import ReactLoading from "react-loading";

const SpinLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "25vh",
        width: "100%",
      }}
    >
      <ReactLoading type="spin" color="white" />
    </div>
  );
};

export default SpinLoading;
