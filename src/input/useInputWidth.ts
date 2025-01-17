import { onMounted, Ref, ref, watch, nextTick } from 'vue';
import { InputValue, TdInputProps } from './type';

export default function useInputWidth(
  props: TdInputProps,
  inputRef: Ref<HTMLInputElement>,
  innerValue: Ref<InputValue>,
) {
  const composing = ref(false);

  const updateInputWidth = () => {
    if (!inputRef.value) return;
    const width = inputRef.value.offsetWidth;
    inputRef.value.style.width = `${width}px`;
  };

  const addListeners = () => {
    watch(
      () => innerValue.value + props.placeholder,
      () => {
        if (!props.autoWidth) return;
        nextTick(() => {
          updateInputWidth();
        });
      },
      { immediate: true },
    );
  };

  onMounted(() => {
    composing.value = false;
    if (props.autoWidth) {
      addListeners();
    }
  });
}
