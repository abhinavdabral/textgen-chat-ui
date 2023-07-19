import { History } from "../types/types";

const template = import.meta.env.VITE_TG_INSTRUCTION_TEMPLATE || "Vicuna-v1.1";

export const createRequestPayload = (input: string, history: History) => {
  return JSON.stringify({
    user_input: input,
    max_new_tokens: 250,
    history: history,
    mode: "instruct",
    character: "Example",
    instruction_template: template,
    your_name: "You",
    regenerate: false,
    _continue: false,
    stop_at_newline: false,
    chat_generation_attempts: 1,
    "chat-instruct_command":
      'Continue the chat dialogue below. Write a single reply for the character "<|character|>".\n\n<|prompt|>',

    preset: "None",
    do_sample: true,
    temperature: 0.7,
    top_p: 0.1,
    typical_p: 1,
    epsilon_cutoff: 0,
    eta_cutoff: 0,
    tfs: 1,
    top_a: 0,
    repetition_penalty: 1.18,
    repetition_penalty_range: 0,
    top_k: 40,
    min_length: 0,
    no_repeat_ngram_size: 0,
    num_beams: 1,
    penalty_alpha: 0,
    length_penalty: 1,
    early_stopping: false,
    mirostat_mode: 0,
    mirostat_tau: 5,
    mirostat_eta: 0.1,

    seed: -1,
    add_bos_token: false,
    truncation_length: 2048,
    ban_eos_token: false,
    skip_special_tokens: true,
    stopping_strings: [],
  });
};
