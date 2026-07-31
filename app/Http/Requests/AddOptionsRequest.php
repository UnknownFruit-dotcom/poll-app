<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AddOptionsRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'options'   => ['required', 'array', 'min:1', 'max:10'],
            'options.*' => ['required', 'string', 'max:255', 'distinct'],
        ];
    }
}
