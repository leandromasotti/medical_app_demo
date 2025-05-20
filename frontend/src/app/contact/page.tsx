import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <p className="text-lg">
          We're here to help! Choose your preferred method of communication below.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chat Option */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-100 p-6 flex justify-center">
            <div className="text-blue-600 text-5xl">💬</div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Chat with Us</h2>
            <p className="text-gray-600 mb-4">
              Get instant answers to your questions through our text messaging service.
            </p>
            <ul className="text-gray-600 mb-4 space-y-2">
              <li>• Available Monday-Friday</li>
              <li>• 8:00 AM - 6:00 PM (CST)</li>
              <li>• Typical response time: 5 minutes</li>
            </ul>
            <button className="btn btn-primary w-full">
              Start Chat
            </button>
          </div>
        </div>
        
        {/* Video Call Option */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-100 p-6 flex justify-center">
            <div className="text-green-600 text-5xl">📹</div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Video Consultation</h2>
            <p className="text-gray-600 mb-4">
              Schedule a face-to-face video call with our medical consultants.
            </p>
            <ul className="text-gray-600 mb-4 space-y-2">
              <li>• Available by appointment</li>
              <li>• Monday-Friday: 9:00 AM - 5:00 PM</li>
              <li>• Consultation length: 30 minutes</li>
            </ul>
            <button className="btn btn-primary w-full">
              Schedule Video Call
            </button>
          </div>
        </div>
        
        {/* Audio Call Option */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-yellow-100 p-6 flex justify-center">
            <div className="text-yellow-600 text-5xl">📞</div>
          </div>
          <div className="p-6">
            <h2 className="text-xl font-bold mb-2">Phone Support</h2>
            <p className="text-gray-600 mb-4">
              Speak directly with our customer service team over the phone.
            </p>
            <ul className="text-gray-600 mb-4 space-y-2">
              <li>• Available Monday-Friday</li>
              <li>• 8:00 AM - 8:00 PM (CST)</li>
              <li>• Call us at: +506 2222-3333</li>
            </ul>
            <button className="btn btn-primary w-full">
              Call Now
            </button>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">How quickly can I schedule a medical procedure?</h3>
            <p className="text-gray-600">
              Scheduling times vary by procedure and provider availability. Most non-emergency procedures can be scheduled within 1-2 weeks.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Do you offer emergency medical services?</h3>
            <p className="text-gray-600">
              We do not provide emergency medical services. If you're experiencing a medical emergency, please call 911 or go to your nearest emergency room.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">How do I cancel or reschedule an appointment?</h3>
            <p className="text-gray-600">
              You can cancel or reschedule through your account dashboard or by contacting us directly. Please provide at least 24 hours notice to avoid cancellation fees.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-12">
        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
        
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-gray-700 mb-1">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Message subject"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your message"
            ></textarea>
          </div>
          
          <button type="submit" className="btn btn-primary px-8">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
