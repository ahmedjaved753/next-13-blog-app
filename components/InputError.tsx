type InputErrorPropsType = {
  errorMessage: string;
};

function InputError({ errorMessage }: InputErrorPropsType) {
  return <p className="text-xs text-red-500">{errorMessage}</p>;
}

export default InputError;
