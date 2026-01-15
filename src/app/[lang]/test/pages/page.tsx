import MessageInput from "@/components/common/form/message-input/message-input";

function TestingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-4 bg-base-100">
      <div className=" mt-80 w-96">
        <MessageInput />
      </div>
    </div>
  );
}

export default TestingPage;
