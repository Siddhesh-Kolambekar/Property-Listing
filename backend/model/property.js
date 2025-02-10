import { Schema, model } from "mongoose";

const propertySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: "user"
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrls: [String],
    location: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: [Number]
    },
    category:{type:String,required:true},
    phone:{type:Number,required:true},
    established:{type:String , required:true},
    description:{type:String,required:true},
    city: { type: String,required:true},
    bhk:{type:Number,required:true},
    length:{type:Number,required:true},
    breadth:{type:Number,required:true},
    rating: { type: Number ,default:0},
    count: { type: Number ,default:0},
});

propertySchema.index({ location: "2dsphere" });

const Property = model("Property", propertySchema);

export default Property;
