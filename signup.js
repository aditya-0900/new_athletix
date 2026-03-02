// Initialize Supabase
// These will be replaced by actual values from the environment if using a build tool,
// or you can paste them directly here.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://dlsbvbzncomxtwovytky.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_sLQF4YLlDoF5SCCwOl-CsQ_i2cshE74';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const signupForm = document.getElementById('signupForm');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset message
    messageDiv.classList.add('hidden');
    messageDiv.classList.remove('bg-emerald-500/10', 'text-emerald-500', 'bg-red-500/10', 'text-red-500');
    
    // Disable button and show loading state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="loader"></div> Processing...';

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const city = document.getElementById('city').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;

    try {
        // 1. Sign up the user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    phone: phone,
                    city: city,
                    age: age
                }
            }
        });

        if (authError) throw authError;

        if (authData.user) {
            // 2. Insert into profiles table
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    { 
                        id: authData.user.id,
                        full_name: fullName, 
                        email: email,
                        phone: phone,
                        city: city,
                        age: parseInt(age)
                    }
                ]);

            if (profileError) throw profileError;

            // Success
            showMessage('Account created successfully! Please check your email for verification.', 'success');
            signupForm.reset();
        }

    } catch (error) {
        console.error('Signup error:', error);
        showMessage(error.message || 'An error occurred during signup.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.classList.remove('hidden');
    
    if (type === 'success') {
        messageDiv.classList.add('bg-emerald-500/10', 'text-emerald-500');
    } else {
        messageDiv.classList.add('bg-red-500/10', 'text-red-500');
    }
}
